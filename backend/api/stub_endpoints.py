"""
Stub API Endpoints for Future Implementation

These endpoints are stubbed for future implementation. They will be
connected when database and full workflow orchestration are implemented.

Reference:
- SAD Section 5.1: API Architecture Requirements
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter()


class OnboardingRequest(BaseModel):
    """Onboarding workflow initiation request."""
    employee_id: str
    role: str
    department: str
    start_date: str


class OnboardingResponse(BaseModel):
    """Onboarding workflow response."""
    workflow_id: str
    status: str
    tasks: List[Dict[str, Any]]


@router.post("/onboarding")
async def initiate_onboarding(request: OnboardingRequest):
    """
    Initiate onboarding workflow.
    
    Future Implementation:
    - Create employee and workflow records in database
    - Trigger orchestrator agent with full crew
    - Initialize all required tasks
    - Return workflow ID for tracking
    
    Status: Stub - Database and full workflow pending
    """
    raise HTTPException(
        status_code=501,
        detail="Onboarding endpoint not implemented in MVP. Full workflow orchestration pending."
    )


@router.get("/onboarding/{workflow_id}")
async def get_onboarding_status(workflow_id: str):
    """
    Get onboarding workflow status.
    
    Future Implementation:
    - Query database for workflow status
    - Return task completion status
    - Include progress percentage
    - Real-time updates via WebSocket
    
    Status: Stub - Database integration pending
    """
    raise HTTPException(
        status_code=501,
        detail="Status endpoint not implemented in MVP. Database integration pending."
    )


@router.post("/documents/upload")
async def upload_document():
    """
    Upload document endpoint.
    
    Future Implementation:
    - Secure file upload to S3
    - Document validation
    - Trigger document verification agent
    - Return document ID
    
    Status: Stub - Document storage integration pending
    """
    raise HTTPException(
        status_code=501,
        detail="Document upload not implemented in MVP. S3 integration pending."
    )
