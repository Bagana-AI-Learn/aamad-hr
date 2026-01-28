# Frontend MVP - Employee Onboarding Workflow

This is the frontend MVP for the Automated Employee Onboarding Workflow system, built with Next.js 14+, TypeScript, and Tailwind CSS.

## Technology Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible components
- **Zustand** for state management
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main chat interface
│   ├── onboarding/        # Onboarding dashboard page
│   ├── api/               # API routes
│   │   └── chat/          # Chat API proxy route
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── chat/              # Chat interface components
│   │   ├── ChatInterface.tsx    # Main chat component
│   │   ├── InputArea.tsx        # Message input with API integration
│   │   ├── MessageList.tsx      # Message display
│   │   └── AgentStatus.tsx      # Agent status indicator
│   ├── onboarding/        # Onboarding components
│   └── placeholders/      # Future feature placeholders
├── lib/                   # Utilities and types
│   ├── chat-service.ts    # Chat API service with SSE handling
│   └── types.ts           # TypeScript type definitions
├── store/                 # Zustand stores
│   └── chatStore.ts       # Chat state management
├── public/                # Static assets
└── TESTING.md             # Testing guide
```

## MVP Features

### ✅ Implemented

- **Chat interface** with real-time streaming responses from CrewAI backend
- **Backend integration** via Next.js API route proxy
- **Server-Sent Events (SSE)** streaming for real-time message updates
- **Onboarding status dashboard** with placeholder data
- **Document upload UI** (visual only, no backend connection)
- **Responsive design** for mobile/tablet/desktop
- **Component library** with shadcn/ui
- **TypeScript** throughout
- **Zustand state management** with real-time updates
- **Error handling** with user-friendly messages

### ⏳ Deferred to Future Phases

- Real document upload functionality
- Real-time status updates from backend
- Advanced dashboard with analytics
- User preferences and settings
- Multi-language support
- WebSocket support for bidirectional communication
- Message persistence

## Development Notes

### Backend Integration

The frontend is **fully integrated** with the CrewAI backend:

**Integration Architecture:**
- **Next.js API Route Proxy** (`app/api/chat/route.ts`) - Proxies requests to backend FastAPI server
- **Chat Service** (`lib/chat-service.ts`) - Handles API communication and SSE streaming
- **Real-time Streaming** - Server-Sent Events (SSE) for character-by-character responses
- **Error Handling** - User-friendly error messages and connection status

**Configuration:**
- Backend URL: Set `BACKEND_URL` environment variable (default: `http://localhost:8000`)
- CORS: Handled by Next.js API route proxy (no CORS issues)

**Usage:**
1. Ensure backend is running on `http://localhost:8000`
2. Start frontend: `npm run dev`
3. Chat messages are sent to `/api/chat` which proxies to backend
4. Responses stream back in real-time via SSE

See [Integration Documentation](../project-context/2.build/integration.md) for detailed architecture and testing guide.

### Accessibility

Components are built with accessibility in mind:
- ARIA labels where appropriate
- Keyboard navigation support
- Semantic HTML structure
- Focus management

### Styling

- Tailwind CSS utility classes
- Design tokens defined in `tailwind.config.ts`
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)

## Testing

### Quick Test

1. **Start Backend:**
   ```bash
   cd ../backend
   python run.py
   ```
   Verify: Visit http://localhost:8000/health

2. **Start Frontend:**
   ```bash
   npm run dev
   ```
   Verify: Visit http://localhost:3000

3. **Test Chat:**
   - Type a message in the chat interface
   - Click Send or press Enter
   - Verify response streams character-by-character from CrewAI agent

See [TESTING.md](./TESTING.md) for detailed testing instructions.

## Next Steps

1. ✅ **Backend Integration** - Complete
2. ✅ **API Integration** - Complete
3. **QA Testing** - Comprehensive testing by QA engineer
4. **Message Persistence** - Store messages in database
5. **Connection Status** - Add backend connection indicator
6. **Error Recovery** - Add retry logic for failed requests
7. **Unit Tests** - Add component and service tests

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Backend API URL (used by Next.js API routes)
BACKEND_URL=http://localhost:8000

# Optional: Public backend URL (for client-side access if needed)
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## References

- [Frontend Development Plan](../project-context/2.build/frontend.md)
- [Backend Development Plan](../project-context/2.build/backend.md)
- [Integration Documentation](../project-context/2.build/integration.md)
- [Product Requirements Document](../project-context/1.define/prd.md)
- [System Architecture Document](../project-context/1.define/sad.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
