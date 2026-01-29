"""
Chat API Endpoint

Handles chat requests and streams responses from CrewAI agents.

Reference:
- SAD Section 5.1: API Architecture Requirements
- SAD Section 4.3: Chat Interface Specifications
"""

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import json
import structlog

from services.crew_manager import OnboardingCrewManager
from typing import AsyncGenerator

logger = structlog.get_logger(__name__)
router = APIRouter()


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str = Field(..., description="User's chat message", min_length=1, max_length=2000)
    employee_id: Optional[str] = Field(None, description="Employee ID for context")
    workflow_id: Optional[str] = Field(None, description="Workflow ID for context")
    conversation_history: Optional[List[Dict[str, str]]] = Field(
        None,
        description="Previous conversation messages"
    )


class ChatResponseChunk(BaseModel):
    """Chat response chunk model for streaming."""
    chunk: str = Field(..., description="Response text chunk")
    agent: str = Field(default="onboarding_orchestrator", description="Agent name")
    status: str = Field(default="responding", description="Response status")
    tool_calls: Optional[List[Dict[str, Any]]] = Field(None, description="Tool execution results")


async def stream_chat_response(
    crew_manager: OnboardingCrewManager,
    request: ChatRequest
) -> AsyncGenerator[str, None]:
    """
    Stream chat response from CrewAI agents.
    
    Yields Server-Sent Events (SSE) formatted chunks.
    """
    try:
        # Send initial status
        yield f"data: {json.dumps({'status': 'thinking', 'agent': 'onboarding_orchestrator'})}\n\n"
        
        # Process message and stream response
        async for chunk in crew_manager.process_chat_message(
            message=request.message,
            employee_id=request.employee_id,
            workflow_id=request.workflow_id,
            conversation_history=request.conversation_history
        ):
            # Format as SSE chunk
            response_chunk = ChatResponseChunk(
                chunk=chunk,
                agent="onboarding_orchestrator",
                status="responding"
            )
            yield f"data: {json.dumps(response_chunk.model_dump())}\n\n"
        
        # Send completion status
        yield f"data: {json.dumps({'status': 'complete', 'agent': 'onboarding_orchestrator'})}\n\n"
        
    except Exception as e:
        logger.error("Error streaming chat response", error=str(e), exc_info=True)
        error_chunk = ChatResponseChunk(
            chunk=f"Error: {str(e)}",
            agent="onboarding_orchestrator",
            status="error"
        )
        yield f"data: {json.dumps(error_chunk.model_dump())}\n\n"


@router.post("/chat")
async def chat_endpoint(request: ChatRequest, app_request: Request):
    """
    Chat API endpoint - streams responses from CrewAI agents.
    
    Args:
        request: Chat request with message and context
        app_request: FastAPI request object for accessing app state
        
    Returns:
        StreamingResponse with Server-Sent Events (SSE) format
    """
    logger.info(
        "Chat endpoint called",
        message_length=len(request.message),
        employee_id=request.employee_id,
        workflow_id=request.workflow_id
    )
    
    # Get crew manager from app state
    try:
        crew_manager: OnboardingCrewManager = app_request.app.state.crew_manager
    except AttributeError:
        logger.error("Crew manager not found in app state")
        raise HTTPException(
            status_code=500, 
            detail="Crew manager not initialized. Please check backend logs for initialization errors."
        )
    
    if not crew_manager:
        logger.error("Crew manager is None")
        raise HTTPException(
            status_code=500, 
            detail="Crew manager is None. Please check backend logs for initialization errors."
        )
    
    # Return streaming response
    return StreamingResponse(
        stream_chat_response(crew_manager, request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable buffering for nginx
        }
    )


@router.get("/chat/status")
async def chat_status_endpoint(app_request: Request):
    """
    Get chat/agent status endpoint.
    
    Returns:
        Dictionary with agent status information
    """
    crew_manager: OnboardingCrewManager = app_request.app.state.crew_manager
    
    if not crew_manager:
        raise HTTPException(status_code=500, detail="Crew manager not initialized")
    
    return crew_manager.get_agent_status()
