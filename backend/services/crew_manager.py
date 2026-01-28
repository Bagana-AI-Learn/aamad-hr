"""
CrewAI Crew Manager Service

Manages CrewAI crew creation, agent orchestration, and workflow execution.
For MVP: Simplified crew with orchestrator agent only.

Reference:
- SAD Section 3.3: CrewAI Framework Configuration
- SAD Section 5.3: CrewAI Integration Layer Requirements
"""

from typing import Dict, List, Any, Optional, AsyncGenerator
from crewai import Crew, Process
from crewai.agent import LLM
from langchain_openai import ChatOpenAI
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
    
    def _create_llm(self) -> LLM:
        """Create LLM instance for agents."""
        return ChatOpenAI(
            model=self.settings.OPENAI_MODEL,
            temperature=self.settings.OPENAI_TEMPERATURE,
            api_key=self.settings.OPENAI_API_KEY,
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
        
        task_description = f"""
        Respond to the following user message about employee onboarding:
        
        User Message: {message}
        
        Context:
        - Employee ID: {employee_id or 'Not provided'}
        - Workflow ID: {workflow_id or 'Not provided'}
        
        Provide a helpful, professional response about the onboarding process.
        If the user is asking about specific tasks (documents, IT access, training),
        acknowledge their request and explain what will happen next.
        """
        
        task = Task(
            description=task_description,
            agent=self.crew.agents[0],  # Orchestrator agent
            expected_output="A helpful response about the onboarding process"
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
            
            # Stream response character by character for realistic UX
            response_text = str(result)
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
        Get status of agents in the crew.
        
        Returns:
            Dictionary with agent status information
        """
        return {
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
        }
    
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
