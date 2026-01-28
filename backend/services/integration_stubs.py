"""
Integration Stubs for Future Implementation

These modules contain stub implementations for integrations that will be
implemented in future phases. They are documented here for reference.

Reference:
- PRD Section 3: Integration Requirements
- SAD Section 7: Data Flow & Integration Architecture
"""

# HRIS Integration Stub
class HRISAdapter:
    """
    Abstract adapter for HRIS integrations (BambooHR, Workday, ADP).
    
    Future Implementation:
    - OAuth 2.0 authentication
    - Employee data sync
    - Org chart retrieval
    - Role information queries
    
    Status: Stub - Implementation pending
    """
    pass


# ATS Integration Stub
class ATSAdapter:
    """
    Abstract adapter for ATS integrations (Greenhouse, Lever, SmartRecruiters).
    
    Future Implementation:
    - Webhook handling for offer acceptance
    - Candidate data retrieval
    - Background check status tracking
    
    Status: Stub - Implementation pending
    """
    pass


# IT Service Management Stub
class ITServiceAdapter:
    """
    Abstract adapter for IT service management (ServiceNow, Jira).
    
    Future Implementation:
    - Ticket creation via API
    - Status polling and webhooks
    - Access provisioning workflows
    
    Status: Stub - Implementation pending
    """
    pass


# Document Storage Stub
class DocumentStorageAdapter:
    """
    Abstract adapter for document storage (S3, Azure Blob).
    
    Future Implementation:
    - Secure document upload
    - Signed URL generation
    - Document versioning
    - Lifecycle management
    
    Status: Stub - Implementation pending
    """
    pass


# LMS Integration Stub
class LMSAdapter:
    """
    Abstract adapter for LMS integrations (Cornerstone, Docebo).
    
    Future Implementation:
    - Training module assignment
    - Progress tracking webhooks
    - Completion verification
    
    Status: Stub - Implementation pending
    """
    pass


# Communication Platform Stub
class CommunicationAdapter:
    """
    Abstract adapter for communication platforms (Slack, Teams).
    
    Future Implementation:
    - Rich message formatting
    - Interactive buttons
    - Channel management
    
    Status: Stub - Implementation pending
    """
    pass
