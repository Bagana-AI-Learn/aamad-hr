# Frontend-Backend Integration Testing Guide

## Quick Test

1. **Start Backend:**
   ```bash
   cd backend
   python run.py
   ```
   Verify: Visit http://localhost:8000/health - should return `{"status": "healthy"}`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Verify: Visit http://localhost:3000 - should show chat interface

3. **Test Chat:**
   - Type a message: "Hello, I need help with onboarding"
   - Click Send or press Enter
   - Verify: Response streams character-by-character from CrewAI agent

## Expected Behavior

- ✅ User message appears immediately
- ✅ Loading indicator shows "Agent is thinking..."
- ✅ Assistant response streams in real-time
- ✅ Response completes and loading indicator disappears

## Troubleshooting

**Backend not responding:**
- Check backend is running: `curl http://localhost:8000/health`
- Check OpenAI API key is set in backend `.env`
- Check backend logs for errors

**Frontend can't connect:**
- Check backend URL in frontend `.env.local`: `BACKEND_URL=http://localhost:8000`
- Check browser console for CORS errors
- Verify Next.js API route is working: `curl http://localhost:3000/api/chat`

**No streaming:**
- Check browser Network tab - should see `/api/chat` request
- Check response type is `text/event-stream`
- Check browser console for SSE parsing errors
