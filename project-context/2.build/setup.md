# Project Setup Documentation

**Document Version:** 1.0  
**Date:** 2025-01-28  
**Status:** Complete  
**Project Manager:** Project Manager Agent (@project-mgr)  
**PRD Reference:** project-context/1.define/prd.md  
**SAD Reference:** project-context/1.define/sad.md

---

## Executive Summary

This document describes the complete setup process for the **Automated Employee Onboarding Workflow** project. All directories have been scaffolded, dependencies documented, and environment variables defined. This setup provides the foundation for downstream development agents to implement the system.

**Setup Status:** ✅ Complete  
**Next Steps:** Frontend development, Backend development, Integration, QA

---

## 1. Directory Structure

### Root Directory Structure

```
aamad-hr/
├── .cursor/                    # AAMAD framework configuration
│   ├── agents/                 # Agent persona definitions
│   ├── prompts/                # Agent prompts
│   ├── rules/                  # Framework rules and adapters
│   └── templates/              # Document templates
├── backend/                    # Python backend (CrewAI agents)
│   ├── agents/                 # Agent definitions
│   ├── tools/                  # Custom tools for agents
│   ├── config/                 # YAML configuration files
│   ├── services/                # Service layer
│   ├── models/                 # Database models
│   ├── utils/                  # Utility functions
│   ├── tests/                  # Test files
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
├── frontend/                   # Next.js frontend (existing)
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── store/                  # Zustand state management
│   └── package.json            # Node.js dependencies
├── project-context/
│   ├── 1.define/               # PRD, SAD, MRD documents
│   ├── 2.build/                # Build artifacts
│   │   └── logs/               # Build logs
│   └── 3.deliver/              # Delivery artifacts
├── scripts/                    # Utility scripts
├── .env                        # Environment variables (gitignored)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── CHECKLIST.md                # Execution checklist
└── README.md                   # Project README
```

### Backend Directory Details

**`backend/agents/`**
- Purpose: CrewAI agent definitions and implementations
- Status: ✅ Directory created, ready for agent code
- Next: Backend engineer will implement agent classes

**`backend/tools/`**
- Purpose: Custom tools for CrewAI agents
- Status: ✅ Directory created, ready for tool implementations
- Next: Backend engineer will implement custom tools

**`backend/config/`**
- Purpose: YAML configuration files for agents and tasks
- Status: ✅ Directory created with `agents.yaml` and `tasks.yaml`
- Files:
  - `agents.yaml`: Agent definitions (5 agents configured)
  - `tasks.yaml`: Task definitions (4 tasks configured)

**`backend/services/`**
- Purpose: Service layer for business logic
- Status: ✅ Directory created, ready for service implementations
- Next: Backend engineer will implement service classes

**`backend/models/`**
- Purpose: Database models and schemas
- Status: ✅ Directory created, ready for model definitions
- Next: Backend engineer will implement SQLAlchemy models

**`backend/utils/`**
- Purpose: Utility functions and helpers
- Status: ✅ Directory created, ready for utility functions
- Next: Backend engineer will implement utility modules

**`backend/tests/`**
- Purpose: Test files for backend code
- Status: ✅ Directory created, ready for test implementations
- Next: QA engineer will implement test suites

### Frontend Directory

**Status:** ✅ Already exists and partially implemented  
**Location:** `frontend/`  
**Framework:** Next.js 14+ with App Router  
**Next:** Frontend engineer will complete implementation

---

## 2. Dependencies

### Python Backend Dependencies

**Location:** `backend/requirements.txt`

**Core Framework:**
- `crewai>=0.28.0` - CrewAI framework for multi-agent orchestration
- `crewai[tools]>=0.28.0` - CrewAI with tools support

**LLM Providers:**
- `openai>=1.12.0` - OpenAI API client
- `anthropic>=0.18.0` - Anthropic API client

**Database:**
- `psycopg2-binary>=2.9.9` - PostgreSQL adapter
- `sqlalchemy>=2.0.23` - SQL toolkit and ORM
- `alembic>=1.13.1` - Database migration tool

**API Framework:**
- `fastapi>=0.109.0` - FastAPI web framework
- `uvicorn[standard]>=0.27.0` - ASGI server
- `pydantic>=2.5.3` - Data validation
- `pydantic-settings>=2.1.0` - Settings management

**HTTP Client:**
- `httpx>=0.26.0` - Async HTTP client
- `requests>=2.31.0` - HTTP library

**Configuration:**
- `python-dotenv>=1.0.0` - Environment variable management

**Logging:**
- `structlog>=24.1.0` - Structured logging

**Testing:**
- `pytest>=8.0.0` - Testing framework
- `pytest-asyncio>=0.23.3` - Async test support
- `pytest-cov>=4.1.0` - Coverage plugin

**Code Quality:**
- `black>=24.1.0` - Code formatter
- `flake8>=7.0.0` - Linter
- `mypy>=1.8.0` - Type checker

**Utilities:**
- `python-dateutil>=2.8.2` - Date utilities
- `pytz>=2024.1` - Timezone support

### Node.js Frontend Dependencies

**Location:** `frontend/package.json`

**Status:** ✅ Already installed  
**Framework:** Next.js 14.2.0  
**Key Dependencies:**
- `next`, `react`, `react-dom` - Core framework
- `@assistant-ui/react` - Chat interface
- `zustand` - State management
- `tailwindcss` - Styling
- `typescript` - Type safety

**Installation:** Already complete (see `frontend/package.json`)

---

## 3. Installation Instructions

### Python Backend Setup

**Prerequisites:**
- Python 3.12+ (verified: Python 3.12.4)
- pip package manager
- Virtual environment support

**Steps:**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Verify installation:**
   ```bash
   python -c "import crewai; print(crewai.__version__)"
   ```

**Note:** Backend dependencies are documented but not yet installed. Backend engineer will install during implementation.

### Node.js Frontend Setup

**Status:** ✅ Already set up  
**Location:** `frontend/`

**If reinstallation needed:**
```bash
cd frontend
npm install
```

**Verify installation:**
```bash
npm run dev
```

---

## 4. Environment Variables

### Environment Variable Configuration

**Files:**
- `.env` - Local environment variables (gitignored)
- `.env.example` - Template for environment variables (committed)

### Required Environment Variables

**AAMAD Framework:**
- `AAMAD_ADAPTER=crewai` - Multi-agent framework adapter

**LLM Providers:**
- `OPENAI_API_KEY` - OpenAI API key for LLM access
- `ANTHROPIC_API_KEY` - Anthropic API key (optional)

**Database:**
- `DATABASE_URL` - PostgreSQL connection string
- `DATABASE_HOST` - Database host (default: localhost)
- `DATABASE_PORT` - Database port (default: 5432)
- `DATABASE_NAME` - Database name (default: aamad_hr)
- `DATABASE_USER` - Database user
- `DATABASE_PASSWORD` - Database password

**Redis:**
- `REDIS_URL` - Redis connection string
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)

**AWS (for S3 document storage):**
- `AWS_REGION` - AWS region (default: us-east-1)
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket for documents

**Application:**
- `NODE_ENV` - Environment (development/production)
- `NEXT_PUBLIC_API_URL` - Frontend API URL
- `BACKEND_URL` - Backend API URL
- `PORT` - Frontend port (default: 3000)
- `BACKEND_PORT` - Backend port (default: 8000)

**Security:**
- `JWT_SECRET` - JWT signing secret
- `SESSION_SECRET` - Session secret
- `ENCRYPTION_KEY` - Encryption key for sensitive data

**External API Keys:**
- `HRIS_API_KEY` - HRIS integration API key
- `ATS_API_KEY` - ATS integration API key
- `SERVICENOW_API_KEY` - ServiceNow API key
- `DOCUSIGN_API_KEY` - DocuSign API key
- `E_VERIFY_API_KEY` - E-Verify API key
- `LMS_API_KEY` - LMS API key
- `SLACK_API_TOKEN` - Slack API token
- `TEAMS_API_TOKEN` - Microsoft Teams API token

**Monitoring:**
- `LOG_LEVEL` - Logging level (INFO/DEBUG/WARN/ERROR)
- `DATADOG_API_KEY` - Datadog API key (optional)
- `SENTRY_DSN` - Sentry DSN for error tracking (optional)

**Feature Flags:**
- `ENABLE_STREAMING` - Enable streaming responses (default: true)
- `ENABLE_WEBSOCKET` - Enable WebSocket updates (default: true)
- `ENABLE_ANALYTICS` - Enable analytics (default: false)

### Setting Up Environment Variables

1. **Copy template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   - Replace placeholder values with actual credentials
   - Keep sensitive values secure (never commit `.env`)

3. **Verify variables are loaded:**
   ```bash
   # Python
   python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv('AAMAD_ADAPTER'))"
   
   # Node.js (in frontend)
   node -e "require('dotenv').config(); console.log(process.env.AAMAD_ADAPTER)"
   ```

---

## 5. Configuration Files

### Agent Configuration

**Location:** `backend/config/agents.yaml`

**Status:** ✅ Created with 5 agents configured

**Agents Defined:**
1. **onboarding_orchestrator** - Supervisor agent
2. **document_verification_agent** - Document compliance specialist
3. **it_provisioning_agent** - IT access provisioning specialist
4. **training_coordinator_agent** - Training assignment coordinator
5. **stakeholder_coordinator_agent** - Communication coordinator

**Configuration Includes:**
- Role, goal, backstory for each agent
- Tool assignments
- Memory and delegation settings
- Execution limits (max_iter, max_execution_time)
- Verbose logging settings

### Task Configuration

**Location:** `backend/config/tasks.yaml`

**Status:** ✅ Created with 4 tasks configured

**Tasks Defined:**
1. **document_collection** - Document verification task
2. **training_assignment** - Training assignment task
3. **stakeholder_coordination** - Stakeholder coordination task
4. **it_provisioning** - IT provisioning task (depends on document_collection)

**Configuration Includes:**
- Task descriptions
- Agent assignments
- Expected outputs
- Task dependencies

---

## 6. Next Steps for Downstream Agents

### For Frontend Engineer (@frontend.eng)

**Epic:** Frontend Development  
**Status:** Ready to begin  
**Prerequisites:** ✅ Setup complete

**Tasks:**
1. Review existing frontend code in `frontend/` directory
2. Complete chat interface implementation
3. Connect frontend to backend API endpoints
4. Implement onboarding dashboard
5. Add document upload functionality
6. Document all work in `project-context/2.build/frontend.md`

**Key Files:**
- `frontend/app/api/chat/route.ts` - Chat API endpoint (needs backend connection)
- `frontend/components/chat/` - Chat components (needs completion)
- `frontend/components/onboarding/` - Onboarding components (needs completion)

**Dependencies:** Frontend dependencies already installed

---

### For Backend Engineer (@backend.eng)

**Epic:** Backend Development  
**Status:** Ready to begin  
**Prerequisites:** ✅ Setup complete

**Tasks:**
1. **Install Python dependencies:**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

2. **Implement agent classes:**
   - Create agent implementations in `backend/agents/`
   - Load agent configurations from `backend/config/agents.yaml`
   - Implement agent-specific logic

3. **Implement custom tools:**
   - Create tool implementations in `backend/tools/`
   - Tools: document_collector, i9_verifier, it_ticket_system, etc.

4. **Implement service layer:**
   - Create services in `backend/services/`
   - Implement CrewAI crew manager
   - Implement workflow orchestration

5. **Implement database models:**
   - Create SQLAlchemy models in `backend/models/`
   - Models: Employee, OnboardingWorkflow, OnboardingTask, Document, etc.

6. **Create API endpoints:**
   - FastAPI endpoints for chat, onboarding, status, documents
   - Integrate with CrewAI agents
   - Implement streaming responses

7. **Document all work in `project-context/2.build/backend.md`**

**Key Files:**
- `backend/config/agents.yaml` - Agent configurations (ready)
- `backend/config/tasks.yaml` - Task configurations (ready)
- `backend/requirements.txt` - Dependencies (ready)

**Dependencies:** Need to install Python dependencies (see Installation Instructions)

---

### For Integration Engineer (@integration.eng)

**Epic:** API Integration  
**Status:** Waiting for Frontend and Backend  
**Prerequisites:** ⏳ Frontend and Backend must be complete

**Tasks:**
1. Wire frontend chat interface to backend chat API
2. Implement streaming response handling
3. Connect onboarding dashboard to backend status API
4. Implement document upload integration
5. Test end-to-end workflows
6. Document integration in `project-context/2.build/integration.md`

**Dependencies:** Frontend and Backend implementations

---

### For QA Engineer (@qa.eng)

**Epic:** Quality Assurance  
**Status:** Waiting for Integration  
**Prerequisites:** ⏳ Integration must be complete

**Tasks:**
1. Create test suites in `backend/tests/`
2. Implement E2E tests for complete workflows
3. Perform smoke tests
4. Verify frontend-backend connectivity
5. Test agent functionality
6. Document test results and issues in `project-context/2.build/qa.md`

**Dependencies:** Complete system integration

---

## 7. Development Workflow

### Local Development Setup

1. **Start PostgreSQL database:**
   ```bash
   # Using Docker
   docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres:14
   
   # Or use local PostgreSQL installation
   ```

2. **Start Redis:**
   ```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7
   
   # Or use local Redis installation
   ```

3. **Start Backend:**
   ```bash
   cd backend
   venv\Scripts\activate
   uvicorn main:app --reload --port 8000
   ```

4. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Git Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/agent-implementation
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Implement agent functionality"
   ```

3. **Push and create PR:**
   ```bash
   git push origin feature/agent-implementation
   ```

---

## 8. Verification Checklist

### Setup Verification

- [x] All directories scaffolded
- [x] Configuration files created (`agents.yaml`, `tasks.yaml`)
- [x] Environment variables defined (`.env.example`)
- [x] Python dependencies documented (`requirements.txt`)
- [x] Frontend dependencies already installed
- [x] Documentation created (`setup.md`, `backend/README.md`)

### Pre-Development Verification

**For Backend Engineer:**
- [ ] Python virtual environment created
- [ ] Python dependencies installed
- [ ] Environment variables configured
- [ ] PostgreSQL database running
- [ ] Redis running
- [ ] Can import CrewAI: `python -c "import crewai"`

**For Frontend Engineer:**
- [x] Node.js dependencies installed
- [ ] Environment variables configured
- [ ] Can run dev server: `npm run dev`
- [ ] Frontend accessible at http://localhost:3000

---

## 9. Architecture Decisions

### Directory Structure Decisions

**Decision:** Separate `backend/` and `frontend/` directories  
**Rationale:** Clear separation of concerns, independent deployment  
**SAD Reference:** Section 2.1 Logical Viewpoint

**Decision:** YAML configuration files in `backend/config/`  
**Rationale:** Externalized configuration per CrewAI adapter rules  
**SAD Reference:** Section 3.3 CrewAI Framework Configuration

**Decision:** Logs directory in `project-context/2.build/logs/`  
**Rationale:** Centralized logging location, follows AAMAD structure  
**SAD Reference:** Section 6.3 Monitoring & Observability

### Dependency Decisions

**Decision:** CrewAI 0.28.0+ for agent framework  
**Rationale:** Latest stable version with required features  
**PRD Reference:** Section 3 - Technical Requirements & Architecture

**Decision:** FastAPI for backend API  
**Rationale:** Modern async framework, good performance, auto-docs  
**SAD Reference:** Section 5.1 API Architecture Requirements

**Decision:** PostgreSQL for primary database  
**Rationale:** ACID compliance, relational structure, proven scalability  
**SAD Reference:** Section 5.2 Database Architecture Specification

---

## 10. Known Issues and Limitations

### Current Limitations

1. **Python Dependencies Not Installed:**
   - Backend dependencies are documented but not yet installed
   - Backend engineer will install during implementation

2. **Database Not Configured:**
   - PostgreSQL database needs to be set up
   - Database schema needs to be created (by backend engineer)

3. **External Services Not Configured:**
   - HRIS, ATS, IT systems integrations not yet implemented
   - API keys need to be obtained and configured

4. **Environment Variables Not Populated:**
   - `.env` file has placeholder values
   - Actual credentials need to be configured

### Future Work

- Database migration scripts (Alembic)
- Docker Compose for local development
- CI/CD pipeline configuration
- Monitoring and logging setup
- Security hardening

---

## 11. Troubleshooting

### Common Issues

**Issue:** Python dependencies fail to install  
**Solution:** Ensure Python 3.12+ is installed, use virtual environment

**Issue:** Environment variables not loading  
**Solution:** Verify `.env` file exists, check `python-dotenv` is installed

**Issue:** Database connection fails  
**Solution:** Verify PostgreSQL is running, check `DATABASE_URL` in `.env`

**Issue:** Redis connection fails  
**Solution:** Verify Redis is running, check `REDIS_URL` in `.env`

---

## Sources

1. **PRD Document:** project-context/1.define/prd.md
2. **SAD Document:** project-context/1.define/sad.md
3. **CrewAI Documentation:** https://docs.crewai.com
4. **Next.js Documentation:** https://nextjs.org/docs

---

## Assumptions

1. Python 3.12+ is available on development machines
2. Node.js 18+ is available (already verified)
3. PostgreSQL database will be set up by backend engineer
4. Redis will be set up by backend engineer
5. External API credentials will be obtained during development
6. Development team has access to required API keys

---

## Open Questions

1. **Database Setup:** Who will set up the initial PostgreSQL database?
2. **API Keys:** When will external API keys be obtained?
3. **Development Environment:** Will Docker Compose be used for local development?
4. **CI/CD:** When will CI/CD pipeline be configured?

---

## Audit

**Timestamp:** 2025-01-28  
**Persona ID:** project-mgr  
**Action:** Project Setup - Scaffold directories, install dependencies, configure environment  
**Model:** GPT-4  
**Temperature:** 0.3  
**Artifact:** project-context/2.build/setup.md  
**Status:** Complete

**Actions Completed:**
- ✅ Scaffolded all required directories
- ✅ Created configuration files (agents.yaml, tasks.yaml)
- ✅ Documented Python dependencies (requirements.txt)
- ✅ Defined environment variables (.env.example)
- ✅ Created setup documentation (setup.md)
- ✅ Created backend README

**Next Steps:**
- Frontend Engineer: Complete frontend implementation
- Backend Engineer: Install dependencies and implement backend
- Integration Engineer: Wire frontend to backend
- QA Engineer: Test complete system

---
