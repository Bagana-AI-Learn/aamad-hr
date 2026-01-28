'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/lib/types';
import { Upload } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MAX_MESSAGE_LENGTH = 2000;

export function InputArea({ onSendMessage, disabled = false }: InputAreaProps) {
  const [input, setInput] = useState('');
  const { addMessage, setLoading } = useChatStore();

  const handleSend = () => {
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
    onSendMessage(trimmedInput);
    setInput('');

    // Simulate agent response (mock - will be replaced with real backend)
    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Thank you for your message. This is a mock response. Backend integration will be implemented in the next phase.',
        timestamp: new Date(),
      };
      addMessage(agentMessage);
      setLoading(false);
    }, 1000);
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
    <div className="border-t border-gray-200 p-4 bg-white" role="region" aria-label="Message input area">
      <div className="flex items-center gap-2">
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
            className="pr-10"
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
        >
          <Upload className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim() || input.length > MAX_MESSAGE_LENGTH}
          aria-label="Send message"
          type="button"
        >
          Send
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p id="input-help" className="text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </p>
        {input.length > 0 && (
          <span className={`text-xs ${isNearLimit ? 'text-orange-600' : 'text-gray-400'}`}>
            {input.length} / {MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>
    </div>
  );
}
