# Frontend – Onboarding Assistant

Next.js frontend for the **Automated Employee Onboarding Workflow**: chat UI (Onboarding Assistant) and onboarding dashboard.

## Stack

- **Next.js 14+** (App Router), **TypeScript**, **Tailwind CSS**
- **shadcn/ui**, **Zustand**, **Lucide React**

## Quick start

### Prerequisites

- Node.js 18+
- **Backend running** on `http://localhost:8000` (required for chat)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

## Project structure

```
frontend/
├── app/
│   ├── layout.tsx, page.tsx    # Root layout, main chat page
│   ├── onboarding/             # Onboarding dashboard
│   ├── api/chat/               # Chat proxy → backend
│   └── globals.css
├── components/
│   ├── chat/                   # ChatInterface, InputArea, MessageList, AgentStatus
│   ├── onboarding/             # DocumentUpload, ProgressIndicator, StatusCard
│   ├── ui/                     # shadcn components
│   └── placeholders/
├── lib/
│   ├── chat-service.ts         # SSE chat API client
│   ├── types.ts, utils.ts, constants.ts
├── store/
│   └── chatStore.ts
└── TESTING.md
```

## Backend integration

- Chat is proxied via **`/api/chat`** to the backend at `BACKEND_URL` (default `http://localhost:8000`).
- **SSE streaming** for assistant replies.
- If the backend is down, chat requests fail (**ECONNREFUSED**). Start the backend first.

### Env vars (optional)

Create `frontend/.env.local`:

```env
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Default is `http://localhost:8000` when unset.

## Testing

1. **Start backend** (see `backend/README.md`):
   ```bash
   cd backend && uvicorn main:app --host 0.0.0.0 --port 8000
   ```
   Check: http://localhost:8000/health

2. **Start frontend:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

3. **Chat:** Use the Onboarding Assistant, try example questions or type your own.

See **`TESTING.md`** for more detail.

## MVP features

- **Chat UI** with streaming replies from CrewAI/OpenRouter
- **Example prompts** (click to fill), plain-text-only responses
- **Onboarding dashboard** (placeholder data)
- **Document upload** UI (visual only)
- Responsive layout, error handling, Zustand state

## References

- `backend/README.md` – Backend setup
- `backend/OPENROUTER_SETUP.md` – OpenRouter configuration
- `project-context/2.build/integration.md` – Integration overview
- `docs/CHAT_INSTRUCTIONS.md` – Chat instructions and example questions
