'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { AgentStatus } from './AgentStatus';
import { useChatStore } from '@/store/chatStore';
import { mockAgentStatus } from '@/lib/constants';

interface ChatInterfaceProps {
  initialMessages?: any[];
  onMessageSent?: (message: string) => void;
}

/**
 * ChatInterface Component
 *
 * Main chat interface component for LLM interaction.
 * Connected to backend CrewAI API via Next.js API route proxy.
 *
 * Reference:
 * - SAD Section 4.3: Chat Interface Specifications
 * - PRD Section 6: User Experience Design - Agent Interaction Design
 * - Frontend Plan Section 4.1: Chat Interface Components
 * - Integration: Connected to backend/api/chat.py via frontend/app/api/chat/route.ts
 */
export function ChatInterface({ initialMessages, onMessageSent }: ChatInterfaceProps) {
  const { messages, isLoading, error } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [prefillPrompt, setPrefillPrompt] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      // Initial messages can be loaded from backend in future
    }
  }, [initialMessages]);

  const handleSendMessage = (message: string) => {
    if (onMessageSent) onMessageSent(message);
  };

  const handleExampleClick = (prompt: string) => {
    setPrefillPrompt(prompt);
  };

  return (
    <div 
      className="flex flex-col h-full w-full bg-gray-50" 
      role="region" 
      aria-label="Chat interface"
    >
      {/* Header with Agent Status */}
      <header className="border-b border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0">
        <h1 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
          Onboarding Assistant
        </h1>
        <div className="hidden sm:block">
          <AgentStatus agent={mockAgentStatus} />
        </div>
        {/* Mobile: Compact agent status */}
        <div className="sm:hidden">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
            <span className="text-xs text-gray-600">{mockAgentStatus.name}</span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <section 
        className="flex-1 overflow-hidden min-h-0"
        aria-label="Message list"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="h-full overflow-y-auto px-2 sm:px-4">
          <MessageList messages={messages} onExampleClick={handleExampleClick} />
          {error && (
            <div 
              className="mx-4 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          {isLoading && (
            <div 
              className="flex items-center justify-center p-4" 
              role="status" 
              aria-live="polite"
              aria-label="Agent is processing your message"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="ml-2 text-sm text-gray-600">Agent is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </section>

      {/* Input Area */}
      <footer className="flex-shrink-0 border-t border-gray-200 bg-white">
        <InputArea
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          prefillPrompt={prefillPrompt}
          onPrefillConsumed={() => setPrefillPrompt(null)}
        />
      </footer>
    </div>
  );
}
