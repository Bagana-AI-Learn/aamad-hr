# Backend MVP Development Plan

**Document Version:** 1.0  
**Date:** 2025-01-28  
**Status:** Complete  
**Persona:** Backend Developer (@backend-eng)  
**Epic:** Backend MVP Development  
**PRD Reference:** project-context/1.define/prd.md  
**SAD Reference:** project-context/1.define/sad.md  
**Setup Reference:** project-context/2.build/setup.md

---

## 1. Executive Summary

### Purpose
This document outlines the backend development plan and implementation for the Automated Employee Onboarding Workflow MVP. The backend provides CrewAI agent orchestration and a chat API endpoint for frontend integration.

### Scope
**MVP Features (Phase 1):**
- CrewAI backend with orchestrator agent
- Agent configuration from YAML files
- Stub tools for all agent types
- Chat API endpoint with streaming support
- Simplified crew for MVP (orchestrator only)

**Deferred to Future Phases:**
- Full multi-agent crew with all 5 agents
- Database integration (PostgreSQL)
- Real tool implementations (HRIS, ATS, IT systems)
- Workflow orchestration with dependencies
- WebSocket support for real-time updates
- Authentication and authorization
- Rate limiting and security middleware

### PRD Traceability
- **PRD Section 3:** Technical Requirements & Architecture - CrewAI Framework Specifications
- **PRD Section 4:** Functional Requirements - Feature 5 (Onboarding Workflow Orchestration)
- **PRD Section 8:** Implementation Strategy - Phase 1 (MVP) - Core Agent Functionality

### SAD Traceability
- **SAD Section 3:** Multi-Agent System Specification
- **SAD Section 5.1:** API Architecture Requirements
- **SAD Section 5.3:** CrewAI Integration Layer Requirements

---

## 2. Technology Stack

### Core Framework
- **CrewAI 0.28.0+** - Multi-agent orchestration framework
  - Agent definitions from YAML configuration
  - Hierarchical crew process (prepared for full implementation)
  - Memory and caching support

### LLM Providers
- **OpenAI GPT-4** - Primary LLM provider
  - Configurable via environment variables
  - Temperature: 0.3 (deterministic responses)
- **Anthropic Claude** - Alternative provider (prepared, not used in MVP)

### API Framework
- **FastAPI 0.109.0+** - Modern async web framework
  - Automatic API documentation
  - Type validation with Pydantic
  - Streaming response support

### Supporting Libraries
- **Pydantic 2.5.3+** - Data validation and settings
- **structlog 24.1.0+** - Structured logging
- **python-dotenv 1.0.0+** - Environment variable management
- **PyYAML** - YAML configuration parsing

### Development Tools
- **pytest 8.0.0+** - Testing framework
- **black 24.1.0+** - Code formatting
- **flake8 7.0.0+** - Linting
- **mypy 1.8.0+** - Type checking

---

## 3. Application Structure

### Directory Structure
```
backend/
├── main.py                    # FastAPI application entry point
├── api/                       # API route handlers
│   ├── __init__.py
│   ├── chat.py               # Chat API endpoint (MVP)
│   └── stub_endpoints.py     # Stub endpoints for future features
├── agents/                    # Agent implementations (future)
│   └── .gitkeep
├── config/                    # YAML configuration files
│   ├── agents.yaml           # Agent definitions (5 agents)
│   └── tasks.yaml            # Task definitions (4 tasks)
├── services/                  # Service layer
│   ├── __init__.py
│   ├── crew_manager.py       # CrewAI crew manager (MVP)
│   ├── integration_stubs.py  # Integration adapter stubs
│   └── workflow_stubs.py     # Workflow orchestration stubs
├── tools/                     # Custom CrewAI tools
│   ├── __init__.py
│   └── stub_tools.py         # Stub tool implementations (MVP)
├── models/                    # Database models (stubbed)
│   └── __init__.py
├── utils/                     # Utility functions
│   ├── __init__.py
│   ├── config.py             # Configuration management
│   └── agent_loader.py       # YAML agent loader
├── tests/                     # Test files (future)
│   └── .gitkeep
├── requirements.txt           # Python dependencies
└── README.md                  # Backend documentation
```

---

## 4. MVP Component Specifications

### 4.1 Main Application (`main.py`)

**Purpose:** FastAPI application entry point  
**Features:**
- FastAPI application setup
- CORS middleware configuration
- Application lifespan management
- Health check endpoints
- Router registration

**Key Components:**
- `lifespan()` - Startup/shutdown tasks
- `root()` - Root endpoint
- `health_check()` - Health check endpoint

### 4.2 Crew Manager Service (`services/crew_manager.py`)

**Purpose:** Manages CrewAI crew creation and execution  
**Features:**
- Loads agent configurations from YAML
- Creates CrewAI crew with orchestrator agent
- Processes chat messages and streams responses
- Agent status reporting

**MVP Implementation:**
- Single orchestrator agent (simplified crew)
- Sequential process (prepared for hierarchical)
- Mock streaming responses
- Stub methods for workflow management

**Future Enhancements:**
- Full multi-agent crew (5 agents)
- Hierarchical process with supervisor
- Database-backed workflow state
- Real-time WebSocket updates

### 4.3 Agent Loader (`utils/agent_loader.py`)

**Purpose:** Loads and creates agents from YAML configuration  
**Features:**
- Parses `agents.yaml` configuration file
- Creates CrewAI Agent instances from config
- Configures LLM, tools, and agent settings
- Validates agent configurations

**Configuration Loading:**
- Loads all 5 agents from `config/agents.yaml`
- Maps agent IDs to configurations
- Creates agents with proper LLM and tools

### 4.4 Stub Tools (`tools/stub_tools.py`)

**Purpose:** Mock tool implementations for MVP agents  
**Features:**
- All required tools implemented as stubs
- Proper tool signatures and return types
- Logging for tool execution
- Clear documentation of future implementation needs

**Tools Implemented (Stubs):**
- **Orchestrator Tools:**
  - `workflow_state_manager` - Workflow state management
  - `task_scheduler` - Task scheduling
  - `exception_handler` - Exception handling
  - `notification_system` - Notifications

- **Document Verification Tools:**
  - `document_collector` - Document collection
  - `i9_verifier` - I-9 verification
  - `compliance_checker` - Compliance checking

- **IT Provisioning Tools:**
  - `it_ticket_system` - IT ticket creation
  - `access_provisioning_api` - Access provisioning

- **Training Coordinator Tools:**
  - `lms_integration` - LMS integration
  - `training_catalog` - Training catalog

- **Stakeholder Coordinator Tools:**
  - `email_system` - Email notifications
  - `calendar_manager` - Calendar scheduling

### 4.5 Chat API Endpoint (`api/chat.py`)

**Purpose:** Handles chat requests and streams agent responses  
**Features:**
- POST `/api/chat` - Chat endpoint with streaming
- GET `/api/chat/status` - Agent status endpoint
- Server-Sent Events (SSE) streaming format
- Request/response validation with Pydantic

**Request Model:**
```python
class ChatRequest(BaseModel):
    message: str  # User message (1-2000 chars)
    employee_id: Optional[str]  # Employee context
    workflow_id: Optional[str]  # Workflow context
    conversation_history: Optional[List[Dict]]  # Previous messages
```

**Response Format:**
- Streaming Server-Sent Events (SSE)
- JSON chunks with status updates
- Character-by-character streaming for UX

---

## 5. Configuration Management

### 5.1 Environment Variables

**Required Variables:**
- `OPENAI_API_KEY` - OpenAI API key (required)
- `OPENAI_MODEL` - Model name (default: "gpt-4")
- `OPENAI_TEMPERATURE` - Temperature (default: 0.3)
- `BACKEND_HOST` - Server host (default: "0.0.0.0")
- `BACKEND_PORT` - Server port (default: 8000)
- `CORS_ORIGINS` - Allowed CORS origins (default: localhost:3000)
- `LOG_LEVEL` - Logging level (default: "INFO")

**Optional Variables:**
- `ANTHROPIC_API_KEY` - Anthropic API key (for future use)
- `CREWAI_MAX_RPM` - Rate limiting (default: 100)
- `CREWAI_VERBOSE` - Verbose logging (default: True)
- `CREWAI_MEMORY` - Enable memory (default: True)
- `ENABLE_STREAMING` - Enable streaming (default: True)

### 5.2 YAML Configuration Files

**`config/agents.yaml`:**
- Defines all 5 agents with roles, goals, backstories
- Configures tools, memory, delegation settings
- Sets execution limits (max_iter, max_execution_time)

**`config/tasks.yaml`:**
- Defines 4 core onboarding tasks
- Specifies agent assignments
- Defines task dependencies

---

## 6. Implementation Details

### 6.1 CrewAI Crew Setup

**MVP Configuration:**
```python
crew = Crew(
    agents=[orchestrator],  # Single agent for MVP
    tasks=[],  # Dynamic task creation
    process=Process.sequential,  # Simplified for MVP
    memory=True,
    verbose=True,
    max_rpm=100,
    manager_llm=llm,
)
```

**Future Configuration (Prepared):**
- All 5 agents in hierarchical process
- Orchestrator as supervisor
- Parallel task execution where possible
- Sequential dependencies enforced

### 6.2 Streaming Response Implementation

**Current Implementation:**
- Character-by-character streaming simulation
- Server-Sent Events (SSE) format
- Status updates (thinking, responding, complete)

**Future Enhancement:**
- Real CrewAI streaming API integration
- Tool execution result streaming
- WebSocket support for bidirectional communication

### 6.3 Error Handling

**Current Implementation:**
- Try-catch blocks around crew execution
- Error messages in response stream
- Structured logging for debugging

**Future Enhancement:**
- Retry logic with exponential backoff
- Error categorization and routing
- Human escalation workflows

---

## 7. Stub Code for Future Features

### 7.1 Database Models (`models/__init__.py`)

**Status:** Stubbed - Database integration pending

**Future Models:**
- `Employee` - Employee information
- `OnboardingWorkflow` - Workflow state
- `OnboardingTask` - Task tracking
- `Document` - Document metadata
- `ITProvisioning` - IT access tracking
- `TrainingAssignment` - Training tracking
- `AuditLog` - Audit trail

### 7.2 Integration Adapters (`services/integration_stubs.py`)

**Status:** Stubbed - External API integration pending

**Future Adapters:**
- `HRISAdapter` - HRIS integrations (BambooHR, Workday, ADP)
- `ATSAdapter` - ATS integrations (Greenhouse, Lever)
- `ITServiceAdapter` - IT service management (ServiceNow, Jira)
- `DocumentStorageAdapter` - Document storage (S3, Azure Blob)
- `LMSAdapter` - LMS integrations (Cornerstone, Docebo)
- `CommunicationAdapter` - Communication platforms (Slack, Teams)

### 7.3 Workflow Orchestration (`services/workflow_stubs.py`)

**Status:** Stubbed - Full workflow orchestration pending

**Future Components:**
- `FullWorkflowOrchestrator` - Multi-agent orchestration
- `WorkflowStateManager` - Database-backed state management
- `ExceptionHandler` - Advanced exception handling

### 7.4 Additional API Endpoints (`api/stub_endpoints.py`)

**Status:** Stubbed - Database integration pending

**Future Endpoints:**
- `POST /api/onboarding` - Initiate onboarding workflow
- `GET /api/onboarding/{workflow_id}` - Get workflow status
- `POST /api/documents/upload` - Upload documents
- `GET /api/status/{workflow_id}` - Real-time status updates

---

## 8. API Documentation

### 8.1 Chat Endpoint

**Endpoint:** `POST /api/chat`

**Request Body:**
```json
{
  "message": "I need help with my onboarding",
  "employee_id": "EMP-001",
  "workflow_id": "workflow-123",
  "conversation_history": []
}
```

**Response:** Server-Sent Events stream
```
data: {"chunk": "Hello", "agent": "onboarding_orchestrator", "status": "responding"}

data: {"chunk": "!", "agent": "onboarding_orchestrator", "status": "responding"}

data: {"status": "complete", "agent": "onboarding_orchestrator"}
```

**Status Codes:**
- `200` - Success (streaming)
- `400` - Invalid request
- `500` - Server error

### 8.2 Status Endpoint

**Endpoint:** `GET /api/chat/status`

**Response:**
```json
{
  "crew_initialized": true,
  "agent_count": 1,
  "agents": [
    {
      "role": "Onboarding Workflow Supervisor and Coordinator",
      "goal": "Orchestrate the complete employee onboarding process..."
    }
  ],
  "process": "sequential"
}
```

---

## 9. Testing Strategy

### 9.1 Unit Testing (Prepared)

**Test Files:** `tests/` directory (created, tests pending)

**Planned Tests:**
- Agent loader tests
- Crew manager tests
- Tool execution tests
- API endpoint tests

### 9.2 Integration Testing (Future)

**Planned Tests:**
- End-to-end chat flow
- Agent orchestration
- Streaming response handling
- Error scenarios

### 9.3 Manual Testing

**MVP Testing:**
1. Start backend server: `uvicorn main:app --reload`
2. Test chat endpoint with curl or Postman
3. Verify streaming responses
4. Check agent status endpoint

---

## 10. Deployment

### 10.1 Local Development

**Start Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Access:**
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

### 10.2 Production Deployment (Future)

**Requirements:**
- Docker containerization
- Environment variable configuration
- Database connection setup
- Redis cache setup
- Monitoring and logging

---

## 11. Known Limitations and Future Work

### 11.1 MVP Limitations

1. **Single Agent:** Only orchestrator agent implemented
   - **Future:** Full 5-agent crew with hierarchical process

2. **No Database:** All state is in-memory
   - **Future:** PostgreSQL integration with SQLAlchemy models

3. **Stub Tools:** All tools return mock data
   - **Future:** Real API integrations for all tools

4. **No Authentication:** API endpoints are unsecured
   - **Future:** JWT authentication and RBAC

5. **No Rate Limiting:** No request throttling
   - **Future:** Redis-based rate limiting

6. **Simplified Streaming:** Character-by-character simulation
   - **Future:** Real CrewAI streaming API integration

### 11.2 Future Enhancements

**Phase 2 (Enhanced):**
- Full multi-agent crew implementation
- Database integration
- Real tool implementations (at least 2-3 integrations)
- Authentication and authorization
- Rate limiting and security middleware

**Phase 3 (Scale):**
- Advanced workflow orchestration
- All external integrations
- WebSocket support
- Performance optimization
- Monitoring and analytics

---

## 12. Implementation Checklist

### Completed ✅
- [x] FastAPI application structure
- [x] Agent loader from YAML configuration
- [x] Crew manager service with orchestrator agent
- [x] Stub tools for all agent types
- [x] Chat API endpoint with streaming
- [x] Configuration management
- [x] Structured logging
- [x] Error handling
- [x] Stub code for future features
- [x] Documentation

### Pending ⏳
- [ ] Unit tests
- [ ] Integration tests
- [ ] Database models (when database integrated)
- [ ] Real tool implementations (when APIs available)
- [ ] Authentication middleware
- [ ] Rate limiting middleware
- [ ] WebSocket support
- [ ] Full multi-agent crew

---

## 13. Traceability Matrix

| PRD Requirement | Backend Component | Status |
|----------------|-------------------|--------|
| PRD 3.1 - Agent Definitions | `config/agents.yaml`, `utils/agent_loader.py` | ✅ Complete |
| PRD 3.2 - Crew Composition | `services/crew_manager.py` | ✅ MVP Complete |
| PRD 4.5 - Workflow Orchestration | `services/crew_manager.py` (stub) | ⚠️ Stub |
| PRD 6.1 - Chat Interface API | `api/chat.py` | ✅ Complete |
| SAD 3.1 - Agent Architecture | `config/agents.yaml` | ✅ Complete |
| SAD 3.3 - CrewAI Configuration | `services/crew_manager.py` | ✅ MVP Complete |
| SAD 5.1 - API Architecture | `main.py`, `api/chat.py` | ✅ Complete |
| SAD 5.3 - CrewAI Integration | `services/crew_manager.py` | ✅ MVP Complete |

---

## 14. Sources

- **PRD:** project-context/1.define/prd.md
- **SAD:** project-context/1.define/sad.md
- **Setup:** project-context/2.build/setup.md
- **Backend Engineer Agent:** .cursor/agents/backend-eng.md
- **CrewAI Documentation:** https://docs.crewai.com
- **FastAPI Documentation:** https://fastapi.tiangolo.com

---

## 15. Assumptions

1. OpenAI API key is available for LLM access
2. Python 3.12+ is available on development machines
3. Database integration will be implemented in Phase 2
4. External API integrations will be implemented in Phase 2
5. Frontend will connect to `/api/chat` endpoint
6. Streaming responses use Server-Sent Events format

---

## 16. Open Questions

1. **LLM Provider:** Should we support multiple LLM providers simultaneously?
2. **Streaming:** What is the optimal chunk size for streaming responses?
3. **Error Handling:** What is the escalation path for agent failures?
4. **Rate Limiting:** What are the rate limits per user/organization?
5. **Monitoring:** What metrics should be tracked for agent performance?

---

## 17. Audit

**Timestamp:** 2025-01-28  
**Persona ID:** backend-eng  
**Action:** Backend MVP Development - Scaffold CrewAI backend, implement chat API  
**Model:** GPT-4  
**Temperature:** 0.3  
**Artifact:** project-context/2.build/backend.md  
**Status:** Complete  
**PRD Reference:** project-context/1.define/prd.md  
**SAD Reference:** project-context/1.define/sad.md  
**Setup Reference:** project-context/2.build/setup.md

**Key Decisions:**
- Simplified MVP crew with orchestrator agent only
- Stub tools for all agent types (real implementations pending)
- Server-Sent Events (SSE) for streaming responses
- YAML-based agent configuration per adapter-crewai rules
- FastAPI for API framework
- Structured logging with structlog
- Character-by-character streaming simulation for UX

**Implementation Status:** ✅ Complete

**Completed Components:**
1. ✅ FastAPI application (`main.py`)
2. ✅ Configuration management (`utils/config.py`)
3. ✅ Agent loader from YAML (`utils/agent_loader.py`)
4. ✅ Crew manager service (`services/crew_manager.py`)
5. ✅ Stub tools (`tools/stub_tools.py`)
6. ✅ Chat API endpoint (`api/chat.py`)
7. ✅ Stub endpoints for future features (`api/stub_endpoints.py`)
8. ✅ Integration stubs (`services/integration_stubs.py`)
9. ✅ Workflow stubs (`services/workflow_stubs.py`)

**Files Created:**
- `backend/main.py` - FastAPI application
- `backend/api/chat.py` - Chat API endpoint
- `backend/api/stub_endpoints.py` - Future endpoint stubs
- `backend/services/crew_manager.py` - Crew manager service
- `backend/services/integration_stubs.py` - Integration stubs
- `backend/services/workflow_stubs.py` - Workflow stubs
- `backend/tools/stub_tools.py` - Tool stubs
- `backend/utils/config.py` - Configuration management
- `backend/utils/agent_loader.py` - Agent loader
- All `__init__.py` files for package structure

**Next Steps:**
1. Install Python dependencies: `pip install -r requirements.txt`
2. Set up environment variables (`.env` file)
3. Start backend server: `uvicorn main:app --reload`
4. Test chat endpoint: `POST http://localhost:8000/api/chat`
5. Proceed to integration phase to connect frontend

---
