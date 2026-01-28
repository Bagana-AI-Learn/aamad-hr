"""
Configuration Management

Loads configuration from environment variables with defaults.
"""

import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    HOST: str = Field(default="0.0.0.0", env="BACKEND_HOST")
    PORT: int = Field(default=8000, env="BACKEND_PORT")
    DEBUG: bool = Field(default=False, env="DEBUG")
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    
    # CORS
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://127.0.0.1:3000"],
        env="CORS_ORIGINS"
    )
    
    # LLM Configuration
    OPENAI_API_KEY: str = Field(default="", env="OPENAI_API_KEY")
    OPENAI_MODEL: str = Field(default="gpt-4", env="OPENAI_MODEL")
    OPENAI_TEMPERATURE: float = Field(default=0.3, env="OPENAI_TEMPERATURE")
    
    ANTHROPIC_API_KEY: str = Field(default="", env="ANTHROPIC_API_KEY")
    ANTHROPIC_MODEL: str = Field(default="claude-3-opus-20240229", env="ANTHROPIC_MODEL")
    
    # CrewAI Configuration
    CREWAI_MAX_RPM: int = Field(default=100, env="CREWAI_MAX_RPM")
    CREWAI_VERBOSE: bool = Field(default=True, env="CREWAI_VERBOSE")
    CREWAI_MEMORY: bool = Field(default=True, env="CREWAI_MEMORY")
    
    # Feature Flags
    ENABLE_STREAMING: bool = Field(default=True, env="ENABLE_STREAMING")
    ENABLE_WEBSOCKET: bool = Field(default=False, env="ENABLE_WEBSOCKET")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


_settings: Settings = None


def get_settings() -> Settings:
    """Get application settings singleton."""
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings
