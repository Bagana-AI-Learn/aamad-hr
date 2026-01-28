import { NextResponse } from 'next/server';

// API route stub - prepared for backend integration
// This will be connected to CrewAI backend in the integration phase

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Stub response - will be replaced with actual CrewAI integration
    return NextResponse.json({
      message: 'Chat API endpoint is prepared but not connected in MVP. This will be implemented in the integration phase.',
      received: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
