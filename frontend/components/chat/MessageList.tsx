'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export function MessageList({ messages, className }: MessageListProps) {
  return (
    <div 
      className={cn('flex flex-col gap-3 sm:gap-4 py-4', className)}
      role="log"
      aria-live="polite"
      aria-label="Conversation messages"
    >
      {messages.length === 0 ? (
        <div 
          className="flex items-center justify-center min-h-[200px] text-gray-500 px-4"
          role="status"
          aria-live="polite"
        >
          <div className="text-center max-w-md">
            <p className="text-base sm:text-lg mb-2">Welcome to the Onboarding Assistant</p>
            <p className="text-sm text-gray-400">
              Start a conversation to begin your onboarding process. I can help you with document submission, IT access, training, and more.
            </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <article
            key={message.id}
            className={cn(
              'flex flex-col gap-1.5 sm:gap-2 w-full sm:max-w-[85%]',
              message.role === 'user' ? 'self-end items-end' : 'self-start items-start'
            )}
            role="article"
            aria-label={`Message from ${message.role === 'user' ? 'you' : 'assistant'}`}
          >
            <div
              className={cn(
                'rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm break-words',
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.role === 'system'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-white text-gray-900 border border-gray-200'
              )}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            </div>
            <time 
              className="text-xs text-gray-500 px-1"
              dateTime={message.timestamp.toISOString()}
              aria-label={`Sent at ${new Date(message.timestamp).toLocaleTimeString()}`}
            >
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
            {message.toolCalls && message.toolCalls.length > 0 && (
              <div 
                className="mt-2 p-2 sm:p-3 bg-blue-50 rounded border border-blue-200 w-full"
                role="region"
                aria-label="Tool execution results"
              >
                <p className="text-xs font-medium text-blue-900 mb-1">Tool Execution:</p>
                {message.toolCalls.map((tool) => (
                  <div key={tool.id} className="text-xs text-blue-700 mt-1">
                    <strong>{tool.name}:</strong> {JSON.stringify(tool.result || 'pending')}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))
      )}
    </div>
  );
}
