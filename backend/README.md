# Backend – CrewAI Agent Orchestration

Python backend for the **Automated Employee Onboarding Workflow**. Chat uses **OpenRouter** (OpenAI-compatible API) via CrewAI.

## Structure

| Path | Description |
|------|-------------|
| `main.py` | FastAPI app entry point |
| `api/` | Route handlers (chat, stubs) |
| `config/` | Agent & task YAML (`agents.yaml`, `tasks.yaml`) |
| `services/` | Crew manager, integration stubs |
| `tools/` | CrewAI tools (stubs) |
| `utils/` | Config, agent loader |
| `verify_openrouter.py` | OpenRouter + connection verification script |
| `test_llm.py` | Direct LLM API test |

## Quick start

### 1. Environment

```bash
python -m venv venv
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
```

### 2. OpenRouter env vars

Create `backend/.env` or set before running:

```env
OPENAI_API_KEY=sk-or-v1-your-openrouter-key
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=openai/gpt-3.5-turbo
OPENAI_TEMPERATURE=0.5
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

- `OPENAI_API_KEY` – **Required.** OpenRouter API key.
- `OPENAI_BASE_URL` – Default `https://openrouter.ai/api/v1`.
- `OPENAI_MODEL` – e.g. `openai/gpt-3.5-turbo`.
- `CREWAI_MEMORY` – Default `false` (recommended for gpt-3.5-turbo).

See **`OPENROUTER_SETUP.md`** for details.

### 3. Verify connection

```bash
cd backend
python verify_openrouter.py
```

Checks env, `llm.provider` / `llm.api_key_set`, and an optional chat call.

### 4. Run backend

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
# Or: python run.py
```

### 5. Test connection

- **Root:** http://localhost:8000/  
- **Health:** http://localhost:8000/health  
- **Chat status (LLM config):** http://localhost:8000/api/chat/status  
- **Docs:** http://localhost:8000/docs  
- **Chat:** `POST http://localhost:8000/api/chat` with `{"message": "What documents do I need?"}`  

## MVP status

**Done:**

- FastAPI app, CORS, config from env
- CrewAI crew manager, orchestrator agent from YAML
- Chat API with SSE streaming
- OpenRouter LLM integration
- `verify_openrouter.py`, `test_llm.py`

**Later:**

- Full multi-agent crew, DB, real tools, auth, rate limiting

## References

- **`OPENROUTER_SETUP.md`** – OpenRouter setup and verification
- **`project-context/2.build/backend.md`** – Implementation notes
- **`project-context/2.build/setup.md`** – Project setup
