"""
Custom Tools for CrewAI Agents

This module provides stub implementations of tools for MVP.
Real implementations will be added in integration phase.

Reference:
- SAD Section 3.1: Agent Architecture Requirements
- PRD Section 3: Technical Requirements & Architecture
"""

from tools.stub_tools import (
    workflow_state_manager,
    task_scheduler,
    exception_handler,
    notification_system,
    document_collector,
    i9_verifier,
    compliance_checker,
    it_ticket_system,
    access_provisioning_api,
    lms_integration,
    training_catalog,
    email_system,
    calendar_manager,
)

__all__ = [
    "workflow_state_manager",
    "task_scheduler",
    "exception_handler",
    "notification_system",
    "document_collector",
    "i9_verifier",
    "compliance_checker",
    "it_ticket_system",
    "access_provisioning_api",
    "lms_integration",
    "training_catalog",
    "email_system",
    "calendar_manager",
]
