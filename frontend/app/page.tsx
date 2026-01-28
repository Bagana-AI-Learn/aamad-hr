'use client';

import { ChatInterface } from '@/components/chat/ChatInterface';

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden bg-gray-50">
      <ChatInterface />
    </main>
  );
}
