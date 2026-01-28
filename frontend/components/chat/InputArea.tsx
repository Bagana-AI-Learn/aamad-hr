'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/lib/types';
import { Upload } from 'lucide-react';
import { sendChatMessage } from '@/lib/chat-service';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MAX_MESSAGE_LENGTH = 2000;

export function InputArea({ onSendMessage, disabled = false }: InputAreaProps) {
  const [input, setInput] = useState('');
  const { addMessage, updateMessage, setLoading, setError, messages } = useChatStore();
  
  // Get store instance for accessing state in callbacks
  const getStoreState = () => useChatStore.getState();

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || disabled || trimmedInput.length > MAX_MESSAGE_LENGTH) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setLoading(true);
    setError(null);
    onSendMessage(trimmedInput);
    setInput('');

    // Create assistant message for streaming
    const assistantMessageId = `msg-${Date.now() + 1}`;
    let assistantMessageContent = '';

    try {
      // Build conversation history from current messages (before adding user message)
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send message to backend and stream response
      await sendChatMessage(
        {
          message: trimmedInput,
          conversation_history: conversationHistory,
        },
        (chunk) => {
          // Handle streaming chunks
          if (chunk.status === 'thinking') {
            // Agent is thinking - keep loading state
            return;
          }

          if (chunk.chunk) {
            // Append chunk to assistant message
            assistantMessageContent += chunk.chunk;
            
            // Get current messages from store to check if message exists
            const currentMessages = getStoreState().messages;
            const existingMessage = currentMessages.find(m => m.id === assistantMessageId);
            
            if (existingMessage) {
              // Update existing message
              updateMessage(assistantMessageId, assistantMessageContent);
            } else {
              // Create new assistant message
              const newMessage: Message = {
                id: assistantMessageId,
                role: 'assistant',
                content: assistantMessageContent,
                timestamp: new Date(),
              };
              addMessage(newMessage);
            }
          }

          if (chunk.status === 'complete' || chunk.status === 'error') {
            setLoading(false);
            if (chunk.status === 'error') {
              setError('An error occurred while processing your message.');
            }
          }
        },
        (error) => {
          // Handle errors
          console.error('Chat API error:', error);
          setError(error.message || 'Failed to send message. Please try again.');
          setLoading(false);
          
          // Add error message to chat
          const errorMessage: Message = {
            id: `msg-error-${Date.now()}`,
            role: 'system',
            content: `Error: ${error.message || 'Failed to connect to backend. Please ensure the backend server is running.'}`,
            timestamp: new Date(),
          };
          addMessage(errorMessage);
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remainingChars = MAX_MESSAGE_LENGTH - input.length;
  const isNearLimit = remainingChars < 100;

  return (
    <div 
      className="p-3 sm:p-4 bg-white" 
      role="region" 
      aria-label="Message input area"
    >
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= MAX_MESSAGE_LENGTH) {
                setInput(value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            className="pr-10 min-h-[44px] text-sm sm:text-base"
            aria-label="Message input"
            aria-describedby="char-count input-help"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          {isNearLimit && (
            <span 
              id="char-count"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
              aria-live="polite"
            >
              {remainingChars}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            // Visual only - upload disabled in MVP
            alert('File upload will be available after backend integration.');
          }}
          disabled={disabled}
          aria-label="Upload file"
          title="File upload (coming soon)"
          type="button"
          className="h-11 w-11 flex-shrink-0"
        >
          <Upload className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim() || input.length > MAX_MESSAGE_LENGTH}
          aria-label="Send message"
          type="button"
          className="h-11 px-4 sm:px-6 flex-shrink-0"
        >
          <span className="hidden sm:inline">Send</span>
          <span className="sm:hidden">→</span>
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
        <p id="input-help" className="text-xs text-gray-500">
          <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
          <span className="sm:hidden">Enter to send</span>
        </p>
        {input.length > 0 && (
          <span 
            className={`text-xs font-medium ${isNearLimit ? 'text-orange-600' : 'text-gray-400'}`}
            aria-label={`${input.length} of ${MAX_MESSAGE_LENGTH} characters`}
          >
            {input.length} / {MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>
    </div>
  );
}
