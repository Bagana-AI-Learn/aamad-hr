# OpenRouter Setup

Backend chat uses OpenRouter (OpenAI-compatible API). No Ollama integration.

## Quick start

1. **Set env** (or create `backend/.env`): `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_MODEL`.
2. **Verify**: `cd backend && python verify_openrouter.py`. Confirm `llm.provider` = openrouter, `llm.api_key_set` = true.
3. **Restart backend**: `uvicorn main:app --host 0.0.0.0 --port 8000`.
4. **Check status**: `curl -s http://localhost:8000/api/chat/status` → `llm` object as above.
5. **Test chat**: Use the frontend or `POST /api/chat` with `{"message": "What documents do I need?"}`.

## Environment variables

Create `backend/.env` with:

```env
OPENAI_API_KEY=sk-or-v1-your-key-here
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=openai/gpt-3.5-turbo
OPENAI_TEMPERATURE=0.5
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Or set before running:

- `OPENAI_API_KEY` – OpenRouter API key (required)
- `OPENAI_BASE_URL` – `https://openrouter.ai/api/v1`
- `OPENAI_MODEL` – e.g. `openai/gpt-3.5-turbo`
- `OPENAI_TEMPERATURE` – default `0.5` (higher = more varied answers)
- `CREWAI_MEMORY` – default `false`. Set `true` only if using a model that supports structured outputs (e.g. `response_format` / json_schema). `openai/gpt-3.5-turbo` does not.

## Verify OpenRouter connection

With the backend running:

```bash
curl -s http://localhost:8000/api/chat/status
```

Check the `llm` object: `provider` should be `"openrouter"`, `base_url` your OpenRouter URL, `model` the model name, and `api_key_set` `true`.

## Verify OpenRouter

From `backend/` (set env vars first or use `.env`):

```bash
python verify_openrouter.py
```

Checks: env vars, `llm.provider` / `llm.api_key_set` via crew manager, and an optional chat test.

## Test LLM

From `backend/`:

```bash
python test_llm.py
```

## Run backend

```bash
cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then open frontend and use the chat; it proxies to the backend which uses OpenRouter.
