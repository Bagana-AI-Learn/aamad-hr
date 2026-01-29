"""
Main FastAPI Application for Automated Employee Onboarding Workflow

This module provides the FastAPI application entry point and API routes.
For MVP: Chat API endpoint only. Other endpoints prepared but not implemented.

Reference:
- SAD Section 5.1: API Architecture Requirements
- PRD Section 3: Technical Requirements & Architecture
"""

import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import structlog

from services.crew_manager import OnboardingCrewManager
from api.chat import router as chat_router
from utils.config import get_settings

# Import tools to ensure they're registered
import tools.stub_tools  # noqa: F401

# Load environment variables
load_dotenv()

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger(__name__)
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup/shutdown tasks."""
    # Startup
    logger.info("Starting backend application", version="0.1.0")
    
    # Initialize crew manager
    try:
        app.state.crew_manager = OnboardingCrewManager()
        logger.info("CrewAI manager initialized successfully")
    except Exception as e:
        logger.error("Failed to initialize CrewAI manager", error=str(e), exc_info=True)
        # Set to None so we can handle the error in the endpoint
        app.state.crew_manager = None
        logger.warning("Application started but crew manager initialization failed")
    
    yield
    
    # Shutdown
    logger.info("Shutting down backend application")


# Create FastAPI application
app = FastAPI(
    title="AAMAD HR - Employee Onboarding API",
    description="Backend API for Automated Employee Onboarding Workflow using CrewAI",
    version="0.1.0",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router, prefix="/api", tags=["chat"])


@app.get("/")
async def root():
    """Root endpoint - health check."""
    return {
        "status": "ok",
        "service": "AAMAD HR Backend",
        "version": "0.1.0",
        "endpoints": {
            "chat": "/api/chat",
            "docs": "/docs",
            "health": "/health"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "crew_manager": "initialized" if hasattr(app.state, "crew_manager") else "not_initialized"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower(),
    )
