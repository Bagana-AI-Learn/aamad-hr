"""
Agent Loader from YAML Configuration

Loads CrewAI agents from YAML configuration files per adapter-crewai rules.
All agent definitions must be externalized to YAML.

Reference:
- SAD Section 3.1: Agent Architecture Requirements
- adapter-crewai.mdc: Configuration Patterns
"""

import yaml
import os
from typing import Dict, List, Any
from pathlib import Path
from crewai import Agent
from langchain_core.language_models import BaseChatModel
from langchain_openai import ChatOpenAI
import structlog

logger = structlog.get_logger(__name__)


def load_agents_from_yaml(config_path: str = None) -> Dict[str, Dict[str, Any]]:
    """
    Load agent configurations from YAML file.
    
    Args:
        config_path: Path to agents.yaml file. Defaults to backend/config/agents.yaml
        
    Returns:
        Dictionary mapping agent IDs to their configurations
    """
    if config_path is None:
        # Default to config directory relative to this file
        backend_dir = Path(__file__).parent.parent
        config_path = backend_dir / "config" / "agents.yaml"
    
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Agent configuration file not found: {config_path}")
    
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    agents_config = config.get('agents', [])
    logger.info("Loaded agent configurations", count=len(agents_config), path=str(config_path))
    
    # Convert list to dictionary keyed by agent ID
    agents_dict = {}
    for agent_config in agents_config:
        agent_id = agent_config.get('id')
        if agent_id:
            agents_dict[agent_id] = agent_config
    
    return agents_dict


def create_agent_from_config(
    agent_config: Dict[str, Any],
    llm: BaseChatModel = None,
    tools: List[Any] = None
) -> Agent:
    """
    Create a CrewAI Agent from configuration dictionary.
    
    Args:
        agent_config: Agent configuration dictionary from YAML
        llm: LLM instance to use (optional, will create default if not provided)
        tools: List of tools to assign to agent (optional)
        
    Returns:
        Configured CrewAI Agent instance
    """
    agent_id = agent_config.get('id')
    role = agent_config.get('role', '')
    goal = agent_config.get('goal', '')
    backstory = agent_config.get('backstory', '')
    
    # Get agent-specific settings
    allow_delegation = agent_config.get('delegation', False)
    verbose = agent_config.get('verbose', True)
    max_iter = agent_config.get('max_iter', 12)
    max_execution_time = agent_config.get('max_execution_time', 300)
    memory = agent_config.get('memory', True)
    
    # Create LLM if not provided (OpenRouter / OpenAI-compatible)
    if llm is None:
        from utils.config import get_settings
        settings = get_settings()
        base_url = settings.OPENAI_BASE_URL or settings.OPENAI_API_BASE or None
        llm = ChatOpenAI(
            model=settings.OPENAI_MODEL,
            temperature=settings.OPENAI_TEMPERATURE,
            api_key=settings.OPENAI_API_KEY,
            base_url=base_url,
        )
    
    # Create agent
    agent = Agent(
        role=role,
        goal=goal,
        backstory=backstory,
        llm=llm,
        tools=tools or [],
        allow_delegation=allow_delegation,
        verbose=verbose,
        max_iter=max_iter,
        max_execution_time=max_execution_time,
        memory=memory,
    )
    
    logger.info(
        "Created agent",
        agent_id=agent_id,
        role=role,
        allow_delegation=allow_delegation,
        max_iter=max_iter,
    )
    
    return agent
