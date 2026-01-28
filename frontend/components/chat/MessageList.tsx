'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export function MessageList({ messages, className }: MessageListProps) {
  return (
    <div className={cn('flex flex-col gap-4 p-4', className)}>
      {messages.length === 0 ? (
        <div 
          className="flex items-center justify-center min-h-[200px] text-gray-500"
          role="status"
          aria-live="polite"
        >
          <p>No messages yet. Start a conversation with the onboarding assistant.</p>
        </div>
      ) : (
        messages.map((message) => (
          <article
            key={message.id}
            className={cn(
              'flex flex-col gap-2 max-w-[80%]',
              message.role === 'user' ? 'self-end items-end' : 'self-start items-start'
            )}
            role="article"
            aria-label={`Message from ${message.role}`}
          >
            <div
              className={cn(
                'rounded-lg px-4 py-2 shadow-sm',
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.role === 'system'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-white text-gray-900 border border-gray-200'
              )}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
            <time 
              className="text-xs text-gray-500"
              dateTime={message.timestamp.toISOString()}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </time>
            {message.toolCalls && message.toolCalls.length > 0 && (
              <div 
                className="mt-2 p-2 bg-blue-50 rounded border border-blue-200"
                role="region"
                aria-label="Tool execution results"
              >
                <p className="text-xs font-medium text-blue-900">Tool Execution:</p>
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
