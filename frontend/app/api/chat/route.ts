import { NextResponse } from 'next/server';

/**
 * Next.js API Route - Chat Proxy
 * 
 * Proxies chat requests to the backend FastAPI server.
 * This route handles CORS and forwards requests to the CrewAI backend.
 * 
 * Reference:
 * - SAD Section 5.1: API Architecture Requirements
 * - Backend API: backend/api/chat.py
 */

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (body.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 2000 characters' },
        { status: 400 }
      );
    }

    // Forward request to backend
    let backendResponse;
    try {
      backendResponse = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (fetchError) {
      console.error('Failed to connect to backend:', fetchError);
      return NextResponse.json(
        { 
          error: 'Failed to connect to backend server',
          details: fetchError instanceof Error ? fetchError.message : String(fetchError),
          backendUrl: BACKEND_URL
        },
        { status: 503 }
      );
    }

    if (!backendResponse.ok) {
      let errorText = '';
      try {
        errorText = await backendResponse.text();
      } catch (e) {
        errorText = `Backend returned status ${backendResponse.status}`;
      }
      
      // Log error for debugging
      console.error('Backend error:', {
        status: backendResponse.status,
        statusText: backendResponse.statusText,
        error: errorText
      });
      
      return NextResponse.json(
        { 
          error: `Backend error: ${errorText}`,
          status: backendResponse.status,
          statusText: backendResponse.statusText
        },
        { status: backendResponse.status }
      );
    }

    // Return streaming response from backend
    return new Response(backendResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Error proxying chat request:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
