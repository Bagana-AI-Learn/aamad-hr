'use client';

import { useEffect, useRef } from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';
import { AgentStatus } from './AgentStatus';
import { useChatStore } from '@/store/chatStore';
import { mockAgentStatus } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

interface ChatInterfaceProps {
  initialMessages?: any[];
  onMessageSent?: (message: string) => void;
}

export function ChatInterface({ initialMessages, onMessageSent }: ChatInterfaceProps) {
  const { messages, isLoading, addMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (onMessageSent) {
      onMessageSent(message);
    }
    // Additional handling will be done in InputArea
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50" role="region" aria-label="Chat interface">
      {/* Header with Agent Status */}
      <header className="border-b border-gray-200 bg-white p-4 flex-shrink-0">
        <h1 className="text-xl font-semibold mb-2 text-gray-900">Onboarding Assistant</h1>
        <AgentStatus agent={mockAgentStatus} />
      </header>

      {/* Messages Area */}
      <section 
        className="flex-1 overflow-hidden min-h-0"
        aria-label="Message list"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="h-full overflow-y-auto">
          <MessageList messages={messages} />
          {isLoading && (
            <div className="flex items-center justify-center p-4" role="status" aria-live="polite">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" aria-hidden="true" />
              <span className="ml-2 text-sm text-gray-600">Agent is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </section>

      {/* Input Area */}
      <footer className="flex-shrink-0">
        <InputArea onSendMessage={handleSendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
}
