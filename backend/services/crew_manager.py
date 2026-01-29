"""
CrewAI Crew Manager Service

Manages CrewAI crew creation, agent orchestration, and workflow execution.
For MVP: Simplified crew with orchestrator agent only.

Reference:
- SAD Section 3.3: CrewAI Framework Configuration
- SAD Section 5.3: CrewAI Integration Layer Requirements
"""

from typing import Dict, List, Any, Optional, AsyncGenerator
import json
from crewai import Crew, Process
from langchain_openai import ChatOpenAI
from langchain_core.language_models import BaseChatModel
import structlog

from utils.agent_loader import load_agents_from_yaml, create_agent_from_config
from utils.config import get_settings
from tools import (
    workflow_state_manager,
    task_scheduler,
    exception_handler,
    notification_system,
)

logger = structlog.get_logger(__name__)
settings = get_settings()


def _strip_markdown_code_blocks(s: str) -> str:
    """Remove ```json ... ``` or ``` ... ``` blocks; return inner content. Handles blocks anywhere in string."""
    t = s.strip()
    for marker in ("```json", "```JSON", "```"):
        i = t.find(marker)
        if i >= 0:
            start = i + len(marker)
            t = t[start:].lstrip("\n\r")
            j = t.find("```")
            if j >= 0:
                t = t[:j].rstrip()
            break
    return t.strip()


def _extract_json_object(s: str) -> Optional[str]:
    """Find first {...} in string, return substring. Handles nested braces."""
    start = s.find("{")
    if start < 0:
        return None
    depth = 0
    for i in range(start, len(s)):
        if s[i] == "{":
            depth += 1
        elif s[i] == "}":
            depth -= 1
            if depth == 0:
                return s[start : i + 1]
    return None


def _extract_plain_message_from_response(raw: str) -> str:
    """Extract plain-text message from raw response (may be JSON or wrapped in markdown)."""
    t = _strip_markdown_code_blocks(raw)
    candidate = _extract_json_object(t) or (t if (t.startswith("{") or t.startswith("[")) else None)
    if not candidate:
        return raw
    try:
        data = json.loads(candidate)
        if data and isinstance(data, dict):
            for key in ("message", "content", "text", "response", "output"):
                v = data.get(key)
                if isinstance(v, str):
                    return v
    except Exception:
        pass
    return raw


class OnboardingCrewManager:
    """
    Manages CrewAI crew for onboarding workflows.
    
    For MVP: Creates simplified crew with orchestrator agent.
    Full multi-agent crew will be implemented in integration phase.
    """
    
    def __init__(self):
        """Initialize crew manager and load agent configurations."""
        self.settings = get_settings()
        self.agents_config = load_agents_from_yaml()
        self.llm = self._create_llm()
        self.crew = None
        self._initialize_crew()
        logger.info("OnboardingCrewManager initialized")
    
    def _create_llm(self) -> BaseChatModel:
        """Create LLM instance for agents (OpenRouter / OpenAI-compatible)."""
        base_url = self.settings.OPENAI_BASE_URL or self.settings.OPENAI_API_BASE or None
        model = self.settings.OPENAI_MODEL
        
        logger.info(
            "Using OpenAI-compatible LLM (OpenRouter)",
            base_url=base_url or "default",
            model=model,
        )
        
        return ChatOpenAI(
            model=model,
            temperature=self.settings.OPENAI_TEMPERATURE,
            api_key=self.settings.OPENAI_API_KEY,
            base_url=base_url,
        )
    
    def _initialize_crew(self):
        """Initialize CrewAI crew with MVP agents."""
        # For MVP: Create orchestrator agent only
        orchestrator_config = self.agents_config.get('onboarding_orchestrator')
        if not orchestrator_config:
            raise ValueError("onboarding_orchestrator configuration not found")
        
        # Create orchestrator agent with tools
        orchestrator_tools = [
            workflow_state_manager,
            task_scheduler,
            exception_handler,
            notification_system,
        ]
        
        orchestrator = create_agent_from_config(
            orchestrator_config,
            llm=self.llm,
            tools=orchestrator_tools
        )
        
        # Create simplified crew for MVP
        # Full hierarchical crew with all agents will be implemented in integration phase
        self.crew = Crew(
            agents=[orchestrator],
            tasks=[],  # Tasks will be created dynamically per chat request
            process=Process.sequential,  # Simplified for MVP
            memory=self.settings.CREWAI_MEMORY,
            verbose=self.settings.CREWAI_VERBOSE,
            max_rpm=self.settings.CREWAI_MAX_RPM,
            manager_llm=self.llm,
        )
        
        logger.info("CrewAI crew initialized", agent_count=1, process="sequential")
    
    async def process_chat_message(
        self,
        message: str,
        employee_id: Optional[str] = None,
        workflow_id: Optional[str] = None,
        conversation_history: Optional[List[Dict[str, str]]] = None
    ) -> AsyncGenerator[str, None]:
        """
        Process chat message and stream response.
        
        Args:
            message: User's chat message
            employee_id: Optional employee ID for context
            workflow_id: Optional workflow ID for context
            conversation_history: Optional conversation history
            
        Yields:
            Response chunks as strings
            
        Note: For MVP, uses simplified response. Full agent orchestration
        will be implemented in integration phase.
        """
        logger.info(
            "Processing chat message",
            message_length=len(message),
            employee_id=employee_id,
            workflow_id=workflow_id
        )
        
        # For MVP: Create a simple task for the orchestrator
        from crewai import Task

        ctx = []
        if employee_id:
            ctx.append(f"Employee ID: {employee_id}")
        if workflow_id:
            ctx.append(f"Workflow ID: {workflow_id}")

        history_blob = ""
        if conversation_history and len(conversation_history) > 0:
            lines = []
            for m in conversation_history[-10:]:  # last 10 turns
                role = (m.get("role") or "user").strip().lower()
                name = "User" if role == "user" else "Assistant"
                content = (m.get("content") or "").strip()
                if content:
                    lines.append(f"{name}: {content}")
            if lines:
                history_blob = "\n\nPrevious conversation:\n" + "\n".join(lines) + "\n\n"

        task_description = f"""You are an onboarding assistant. Answer based on general onboarding knowledge (documents, IT access, training, coordination).
{history_blob}
Current user message: "{message}"
{f'Additional context: ' + '; '.join(ctx) if ctx else ''}

Examples of good, varied answers (match the question type):
- "What documents do I need?" → Give a concrete list: I-9, W-4, direct deposit form, ID. Brief note on where to submit.
- "How does IT access work?" → Short steps: request triggered by HR, IT provisions email/VPN/tools, you receive credentials before day one.
- "What training is required?" → List modules (e.g. security, code of conduct, role-specific) and how they're assigned.

Instructions:
1. ANSWER THE USER'S QUESTION DIRECTLY. Give concrete, specific information. Do NOT give the same generic overview every time.
2. NEVER ask for Employee ID or Workflow ID. Do not say "Could you please provide Employee ID or Workflow ID" or similar.
3. Vary your answer based on the question. Be concise and helpful.
4. Reply in plain text only. No JSON, code blocks, or markdown. Write only the reply message."""

        task = Task(
            description=task_description,
            agent=self.crew.agents[0],  # Orchestrator agent
            expected_output="A direct, specific plain-text answer to the user's question; no JSON or formatting"
        )
        
        # Update crew with task
        self.crew.tasks = [task]
        
        # Execute crew and stream response
        try:
            # For MVP: Execute crew and yield response chunks
            # In production, this would use streaming API
            import asyncio
            
            # Run crew execution in executor to avoid blocking
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, self.crew.kickoff)
            
            # Stream plain text only; extract from JSON / markdown if model returns that
            raw = str(result).strip()
            logger.info(
                "LLM response received",
                raw_length=len(raw),
                preview=(raw[:80] + "..." if len(raw) > 80 else raw),
            )
            response_text = _extract_plain_message_from_response(raw)
            for char in response_text:
                yield char
                # Small delay to simulate streaming
                await asyncio.sleep(0.02)
                
        except Exception as e:
            logger.error("Error processing chat message", error=str(e), exc_info=True)
            import asyncio
            error_message = f"I apologize, but I encountered an error: {str(e)}"
            for char in error_message:
                yield char
                await asyncio.sleep(0.02)
    
    def get_agent_status(self) -> Dict[str, Any]:
        """
        Get status of agents in the crew and LLM (OpenRouter) config.
        """
        base_url = self.settings.OPENAI_BASE_URL or self.settings.OPENAI_API_BASE or None
        out = {
            "crew_initialized": self.crew is not None,
            "agent_count": len(self.crew.agents) if self.crew else 0,
            "agents": [
                {
                    "role": agent.role,
                    "goal": agent.goal[:100] + "..." if len(agent.goal) > 100 else agent.goal,
                }
                for agent in (self.crew.agents if self.crew else [])
            ],
            "process": str(self.crew.process) if self.crew else None,
            "llm": {
                "provider": "openrouter",
                "base_url": base_url or "(default)",
                "model": self.settings.OPENAI_MODEL,
                "api_key_set": bool(self.settings.OPENAI_API_KEY),
            },
        }
        return out
    
    # Stub methods for future implementation
    
    def initiate_onboarding(self, employee_data: Dict[str, Any]) -> str:
        """
        Initiate onboarding workflow.
        
        Args:
            employee_data: Employee information dictionary
            
        Returns:
            Workflow ID
            
        Note: Stub for future implementation - will create full workflow
        """
        logger.info("Initiate onboarding called (stub)", employee_id=employee_data.get("employee_id"))
        workflow_id = f"workflow-{employee_data.get('employee_id', 'unknown')}"
        logger.warning("initiate_onboarding is a stub - full implementation pending")
        return workflow_id
    
    def get_workflow_status(self, workflow_id: str) -> Dict[str, Any]:
        """
        Get workflow status.
        
        Args:
            workflow_id: Workflow identifier
            
        Returns:
            Dictionary with workflow status
            
        Note: Stub for future implementation - will query database
        """
        logger.info("Get workflow status called (stub)", workflow_id=workflow_id)
        logger.warning("get_workflow_status is a stub - database implementation pending")
        return {
            "workflow_id": workflow_id,
            "status": "unknown",
            "note": "Stub - database implementation pending"
        }
