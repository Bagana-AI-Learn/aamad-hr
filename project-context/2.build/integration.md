# Frontend-Backend Integration Documentation

**Document Version:** 1.0  
**Date:** 2025-01-28  
**Status:** Complete  
**Persona:** Integration Engineer (@integration-eng)  
**Epic:** API Integration  
**PRD Reference:** project-context/1.define/prd.md  
**SAD Reference:** project-context/1.define/sad.md  
**Frontend Reference:** project-context/2.build/frontend.md  
**Backend Reference:** project-context/2.build/backend.md

---

## 1. Executive Summary

### Purpose
This document describes the integration of the frontend Next.js chat interface with the backend CrewAI FastAPI server. The integration enables real-time chat communication between users and the CrewAI orchestrator agent.

### Scope
**MVP Integration:**
- Next.js API route proxy to backend FastAPI endpoint
- Server-Sent Events (SSE) streaming from backend to frontend
- Real-time message display with character-by-character streaming
- Error handling and connection management
- Chat round-trip functionality

**Deferred to Future Phases:**
- WebSocket support for bidirectional communication
- Authentication and authorization
- Rate limiting
- Connection retry logic
- Message persistence

### Integration Status
✅ **Complete** - Frontend and backend are connected and functional

---

## 2. Architecture Overview

### Integration Flow

```
User Input (Frontend)
    ↓
InputArea Component
    ↓
sendChatMessage() → /api/chat (Next.js API Route)
    ↓
Proxy to Backend → http://localhost:8000/api/chat (FastAPI)
    ↓
CrewAI Crew Manager → Orchestrator Agent
    ↓
Stream Response (SSE) → Next.js API Route
    ↓
Stream to Frontend → ChatService
    ↓
Update Zustand Store → MessageList Component
    ↓
Display to User
```

### Components

**Frontend:**
- `frontend/lib/chat-service.ts` - Chat API service with SSE handling
- `frontend/app/api/chat/route.ts` - Next.js API route proxy
- `frontend/components/chat/InputArea.tsx` - Message input with API integration
- `frontend/store/chatStore.ts` - Zustand store for message state

**Backend:**
- `backend/api/chat.py` - FastAPI chat endpoint with SSE streaming
- `backend/services/crew_manager.py` - CrewAI crew manager

---

## 3. Implementation Details

### 3.1 Next.js API Route Proxy

**File:** `frontend/app/api/chat/route.ts`

**Purpose:** Proxy chat requests to backend FastAPI server

**Features:**
- Validates request payload
- Forwards requests to backend
- Streams SSE responses back to frontend
- Handles errors and connection issues

**Configuration:**
- Backend URL: `BACKEND_URL` environment variable (default: `http://localhost:8000`)
- Can also use `NEXT_PUBLIC_BACKEND_URL` for client-side access

**Request Validation:**
- Message must be a string
- Message length must be ≤ 2000 characters
- Returns 400 error for invalid requests

**Response Format:**
- Server-Sent Events (SSE) stream
- Headers: `text/event-stream`, `no-cache`, `keep-alive`

### 3.2 Chat Service

**File:** `frontend/lib/chat-service.ts`

**Purpose:** Handle API communication and SSE streaming

**Functions:**
- `sendChatMessage()` - Send message and stream response
- `getAgentStatus()` - Get agent status (stub for MVP)

**SSE Parsing:**
- Reads stream using `ReadableStream` API
- Parses SSE format (`data: {...}\n\n`)
- Calls `onChunk` callback for each chunk
- Handles errors via `onError` callback

### 3.3 InputArea Component Integration

**File:** `frontend/components/chat/InputArea.tsx`

**Changes:**
- Removed mock `setTimeout` response
- Integrated `sendChatMessage()` from chat service
- Handles streaming chunks and updates messages in real-time
- Creates assistant message and updates content as chunks arrive
- Error handling with user-friendly messages

**Streaming Logic:**
1. User sends message → Added to store
2. Create assistant message placeholder
3. Stream chunks from backend
4. Append chunks to assistant message content
5. Update message in store as chunks arrive
6. Complete when status is 'complete' or 'error'

### 3.4 Zustand Store Updates

**File:** `frontend/store/chatStore.ts`

**New Function:**
- `updateMessage()` - Update existing message content (for streaming)

**Usage:**
- Used to update assistant message as streaming chunks arrive
- Enables real-time message display

---

## 4. API Contract

### 4.1 Request Format

**Endpoint:** `POST /api/chat`

**Request Body:**
```typescript
{
  message: string;                    // Required, 1-2000 chars
  employee_id?: string;               // Optional
  workflow_id?: string;               // Optional
  conversation_history?: Array<{       // Optional
    role: string;
    content: string;
  }>;
}
```

### 4.2 Response Format

**Response Type:** Server-Sent Events (SSE) stream

**Chunk Format:**
```
data: {"status": "thinking", "agent": "onboarding_orchestrator"}

data: {"chunk": "H", "agent": "onboarding_orchestrator", "status": "responding"}

data: {"chunk": "e", "agent": "onboarding_orchestrator", "status": "responding"}

data: {"chunk": "l", "agent": "onboarding_orchestrator", "status": "responding"}

...

data: {"status": "complete", "agent": "onboarding_orchestrator"}
```

**Chunk Types:**
- `thinking` - Agent is processing (no chunk data)
- `responding` - Agent is streaming response (includes `chunk` field)
- `complete` - Response complete
- `error` - Error occurred (includes error message)

---

## 5. Testing

### 5.1 Manual Testing Steps

**Prerequisites:**
1. Backend server running on `http://localhost:8000`
2. Frontend server running on `http://localhost:3000`
3. Environment variable `BACKEND_URL` set (or use default)

**Test Procedure:**

1. **Start Backend:**
   ```bash
   cd backend
   python run.py
   ```
   Verify: `http://localhost:8000/health` returns `{"status": "healthy"}`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Verify: `http://localhost:3000` loads chat interface

3. **Test Chat Flow:**
   - Open browser to `http://localhost:3000`
   - Type a message in the chat input
   - Click "Send" or press Enter
   - Verify:
     - User message appears immediately
     - Loading indicator shows
     - Assistant response streams character-by-character
     - Response completes and loading indicator disappears

4. **Test Error Handling:**
   - Stop backend server
   - Send a message from frontend
   - Verify error message appears in chat

### 5.2 Test Results

**✅ Successful Tests:**
- Chat message sent from frontend
- Request proxied to backend via Next.js API route
- Backend processes message with CrewAI agent
- Response streams back to frontend
- Message displays in real-time
- Loading states work correctly

**⚠️ Known Issues:**
- None identified in MVP testing

**🔧 Future Improvements:**
- Add connection retry logic
- Add connection status indicator
- Add message persistence
- Add WebSocket support for bidirectional communication

---

## 6. Configuration

### 6.1 Environment Variables

**Backend URL Configuration:**
- `BACKEND_URL` - Backend API URL (server-side, used by Next.js API route)
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL (client-side, optional)

**Default:** `http://localhost:8000`

**Example `.env.local` (frontend):**
```env
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 6.2 CORS Configuration

**Backend CORS:** Configured in `backend/main.py`
- Allows origins: `http://localhost:3000`, `http://127.0.0.1:3000`
- Configurable via `CORS_ORIGINS` environment variable

**Frontend:** Uses Next.js API route proxy (no CORS issues)

---

## 7. Error Handling

### 7.1 Frontend Error Handling

**Connection Errors:**
- Backend unavailable → Error message displayed
- Network errors → User-friendly error message
- Invalid responses → Error logged to console

**Error Display:**
- Error messages shown in chat as system messages
- Error banner displayed above message list
- Loading state cleared on error

### 7.2 Backend Error Handling

**Request Validation:**
- Invalid message format → 400 Bad Request
- Message too long → 400 Bad Request
- Missing message → 400 Bad Request

**Processing Errors:**
- Agent execution errors → Error chunk in stream
- Stream errors → Error response

---

## 8. Performance Considerations

### 8.1 Streaming Performance

**Current Implementation:**
- Character-by-character streaming for UX
- Small delay (20ms) between chunks for readability
- Efficient SSE parsing

**Future Optimizations:**
- Word-by-word or sentence-by-sentence streaming
- Configurable chunk size
- Compression for large responses

### 8.2 Connection Management

**Current:**
- Single request per message
- No connection pooling
- No connection reuse

**Future:**
- WebSocket for persistent connection
- Connection pooling
- Automatic reconnection

---

## 9. Known Issues and Limitations

### 9.1 MVP Limitations

1. **No Message Persistence:**
   - Messages are lost on page refresh
   - **Future:** Store messages in database or localStorage

2. **No Authentication:**
   - API endpoints are unsecured
   - **Future:** Add JWT authentication

3. **No Rate Limiting:**
   - No request throttling
   - **Future:** Add rate limiting middleware

4. **Simplified Error Handling:**
   - Basic error messages
   - **Future:** Detailed error categorization

5. **No Connection Status:**
   - No indicator if backend is unavailable
   - **Future:** Add connection status indicator

### 9.2 Technical Debt

1. **SSE Parsing:**
   - Current implementation handles basic SSE format
   - May need enhancement for complex scenarios

2. **Message Updates:**
   - Uses Zustand store directly in streaming callback
   - Could be optimized with React state updates

3. **Error Recovery:**
   - No automatic retry on failure
   - **Future:** Add retry logic with exponential backoff

---

## 10. Future Enhancements

### 10.1 Phase 2 Enhancements

**WebSocket Support:**
- Bidirectional communication
- Real-time status updates
- Connection state management

**Message Persistence:**
- Store messages in database
- Load conversation history
- Message search functionality

**Enhanced Error Handling:**
- Retry logic
- Error categorization
- User-friendly error messages

### 10.2 Phase 3 Enhancements

**Advanced Features:**
- Multi-user support
- Message threading
- File attachments
- Rich message formatting

---

## 11. Troubleshooting

### 11.1 Common Issues

**Issue:** "Failed to connect to backend"
- **Cause:** Backend server not running
- **Solution:** Start backend with `python run.py` in `backend/` directory

**Issue:** "CORS error"
- **Cause:** Backend CORS not configured for frontend origin
- **Solution:** Check `CORS_ORIGINS` in backend `.env` file

**Issue:** "Messages not streaming"
- **Cause:** SSE parsing issue or network problem
- **Solution:** Check browser console for errors, verify backend is streaming

**Issue:** "Backend returns 500 error"
- **Cause:** Backend error (check backend logs)
- **Solution:** Check backend logs, verify OpenAI API key is set

### 11.2 Debugging

**Frontend Debugging:**
- Check browser console for errors
- Check Network tab for API requests
- Verify `/api/chat` route is being called
- Check Zustand store state in React DevTools

**Backend Debugging:**
- Check backend logs (structlog output)
- Verify crew manager is initialized
- Check OpenAI API key is valid
- Test backend endpoint directly: `curl -X POST http://localhost:8000/api/chat`

---

## 12. Traceability

### 12.1 PRD Traceability

| PRD Requirement | Integration Component | Status |
|----------------|----------------------|--------|
| PRD 4.5 - Workflow Orchestration UI | Chat API integration | ✅ Complete |
| PRD 6.1 - Web Portal | Frontend-Backend connection | ✅ Complete |
| PRD 6.2 - Responsive Design | Chat interface responsive | ✅ Complete |

### 12.2 SAD Traceability

| SAD Requirement | Integration Component | Status |
|----------------|----------------------|--------|
| SAD 4.3 - Chat Interface | Streaming chat integration | ✅ Complete |
| SAD 5.1 - API Architecture | Next.js API route proxy | ✅ Complete |
| SAD 5.3 - CrewAI Integration | Backend API connection | ✅ Complete |

---

## 13. Sources

- **Frontend Plan:** project-context/2.build/frontend.md
- **Backend Plan:** project-context/2.build/backend.md
- **Setup Guide:** project-context/2.build/setup.md
- **PRD:** project-context/1.define/prd.md
- **SAD:** project-context/1.define/sad.md
- **Integration Engineer Agent:** .cursor/agents/integration-end.md

---

## 14. Assumptions

1. Backend server is running on `http://localhost:8000` (default)
2. Frontend server is running on `http://localhost:3000` (default)
3. OpenAI API key is configured in backend environment
4. CORS is properly configured in backend
5. Network connectivity between frontend and backend

---

## 15. Open Questions

1. **Production Deployment:** How will frontend and backend be deployed together?
2. **Environment Configuration:** How will backend URL be configured in production?
3. **Error Monitoring:** What error tracking service will be used?
4. **Performance Monitoring:** What metrics should be tracked?

---

## 16. Audit

**Timestamp:** 2025-01-28  
**Persona ID:** integration-eng  
**Action:** Frontend-Backend Integration - Wire chat API, test round-trip  
**Model:** GPT-4  
**Temperature:** 0.3  
**Artifact:** project-context/2.build/integration.md  
**Status:** Complete  
**PRD Reference:** project-context/1.define/prd.md  
**SAD Reference:** project-context/1.define/sad.md  
**Frontend Reference:** project-context/2.build/frontend.md  
**Backend Reference:** project-context/2.build/backend.md

**Key Decisions:**
- Use Next.js API route as proxy to backend (handles CORS, single entry point)
- Server-Sent Events (SSE) for streaming responses
- Character-by-character streaming for realistic UX
- Zustand store for message state management
- Error handling with user-friendly messages

**Implementation Status:** ✅ Complete

**Completed Components:**
1. ✅ Next.js API route proxy (`frontend/app/api/chat/route.ts`)
2. ✅ Chat service with SSE handling (`frontend/lib/chat-service.ts`)
3. ✅ InputArea integration (`frontend/components/chat/InputArea.tsx`)
4. ✅ Zustand store updates (`frontend/store/chatStore.ts`)
5. ✅ Error handling and display
6. ✅ Streaming message updates

**Files Created/Modified:**
- `frontend/lib/chat-service.ts` - Chat API service (new)
- `frontend/app/api/chat/route.ts` - API route proxy (updated)
- `frontend/components/chat/InputArea.tsx` - API integration (updated)
- `frontend/store/chatStore.ts` - Store updates (updated)
- `frontend/components/chat/ChatInterface.tsx` - Error display (updated)
- `project-context/2.build/integration.md` - Integration documentation (new)

**Testing Status:**
- ✅ Manual testing completed
- ✅ Chat round-trip functionality verified
- ✅ Streaming responses working
- ✅ Error handling tested

**Next Steps:**
1. QA Engineer: Perform comprehensive testing
2. Add connection status indicator
3. Add message persistence
4. Add retry logic for failed requests

---
