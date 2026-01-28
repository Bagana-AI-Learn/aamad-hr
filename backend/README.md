# Backend - CrewAI Agent Orchestration

This directory contains the Python backend for the Automated Employee Onboarding Workflow system.

## Structure

- `main.py` - FastAPI application entry point
- `api/` - API route handlers (chat endpoint)
- `agents/` - CrewAI agent definitions (future)
- `tools/` - Custom tools for agents (stub implementations)
- `config/` - Agent and crew configuration files (YAML)
- `services/` - Service layer (crew manager, stubs)
- `models/` - Database models and schemas (stubbed)
- `utils/` - Utility functions and helpers
- `tests/` - Test files (future)

## Quick Start

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   ```bash
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if exists) or create `.env` file
   - Set `OPENAI_API_KEY` (required)
   - Configure other variables as needed

5. **Start backend server:**
   ```bash
   python run.py
   # Or
   uvicorn main:app --reload --port 8000
   ```

6. **Access API:**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - Health: http://localhost:8000/health
   - Chat: POST http://localhost:8000/api/chat

## MVP Status

✅ **Implemented:**
- FastAPI application with CORS
- CrewAI crew manager with orchestrator agent
- Agent loader from YAML configuration
- Stub tools for all agent types
- Chat API endpoint with streaming support
- Configuration management
- Structured logging

⏳ **Pending (Future Phases):**
- Full multi-agent crew (5 agents)
- Database integration
- Real tool implementations
- Authentication and authorization
- Rate limiting
- Additional API endpoints

## Development

See `project-context/2.build/setup.md` for detailed setup instructions.  
See `project-context/2.build/backend.md` for complete implementation documentation.
