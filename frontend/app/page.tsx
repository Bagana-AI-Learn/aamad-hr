'use client';

import { ChatInterface } from '@/components/chat/ChatInterface';

/**
 * Main Chat Page
 * 
 * Entry point for the chat interface. Provides full-screen chat experience
 * with responsive design for mobile, tablet, and desktop.
 * 
 * Reference: SAD Section 4.2 - Application Structure Requirements
 */
export default function Home() {
  return (
    <main 
      className="h-screen w-full flex flex-col overflow-hidden bg-gray-50"
      role="main"
      aria-label="Onboarding Assistant Chat"
    >
      <ChatInterface />
    </main>
  );
}
