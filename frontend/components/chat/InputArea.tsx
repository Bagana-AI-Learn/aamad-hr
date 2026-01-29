'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/lib/types';
import { Upload } from 'lucide-react';
import { sendChatMessage } from '@/lib/chat-service';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  prefillPrompt?: string | null;
  onPrefillConsumed?: () => void;
}

const MAX_MESSAGE_LENGTH = 2000;

function stripMarkdownCodeBlocks(s: string): string {
  let t = s.trim();
  for (const marker of ['```json', '```JSON', '```']) {
    const i = t.indexOf(marker);
    if (i >= 0) {
      t = t.slice(i + marker.length).replace(/^\s*[\n\r]+/, '').trim();
      const j = t.indexOf('```');
      if (j >= 0) t = t.slice(0, j).trim();
      break;
    }
  }
  return t;
}

function extractJsonObject(s: string): string | null {
  const start = s.indexOf('{');
  if (start < 0) return null;
  let depth = 0;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return null;
}

/** Extract plain-text message from content. Removes JSON / markdown wrapping so UI shows only the message. */
function extractMessageText(content: string): string {
  if (!content || typeof content !== 'string') return content;
  const stripped = stripMarkdownCodeBlocks(content);
  const jsonStr = extractJsonObject(stripped) ?? (stripped.startsWith('{') || stripped.startsWith('[') ? stripped : null);
  if (jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (data && typeof data === 'object') {
        const v = data.message ?? data.content ?? data.text ?? data.response ?? data.output;
        if (typeof v === 'string') return v.trim();
      }
    } catch {
      /* fallback: regex extract "message":"..." or "content":"..." when JSON is invalid */
      const m = jsonStr.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"|"content"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (m) return (m[1] ?? m[2] ?? '').replace(/\\"/g, '"').trim();
    }
  }
  return content;
}

export function InputArea({ onSendMessage, disabled = false, prefillPrompt, onPrefillConsumed }: InputAreaProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addMessage, setLoading, setError, messages } = useChatStore();

  useEffect(() => {
    if (!prefillPrompt) return;
    setInput(prefillPrompt);
    onPrefillConsumed?.();
    inputRef.current?.focus();
  }, [prefillPrompt, onPrefillConsumed]);

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

    const assistantMessageId = `msg-${Date.now() + 1}`;
    let assistantMessageContent = '';

    try {
      // Prior turns only; current message is sent as `message`
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      await sendChatMessage(
        {
          message: trimmedInput,
          conversation_history: conversationHistory,
        },
        (chunk) => {
          if (chunk.status === 'thinking') return;

          if (chunk.chunk) assistantMessageContent += chunk.chunk;

          if (chunk.status === 'complete' || chunk.status === 'error') {
            const toShow = extractMessageText(assistantMessageContent);
            const assistantMessage: Message = {
              id: assistantMessageId,
              role: 'assistant',
              content: toShow,
              timestamp: new Date(),
            };
            addMessage(assistantMessage);
            setLoading(false);
            if (chunk.status === 'error') {
              setError('An error occurred while processing your message.');
            }
          }
        },
        (error) => {
          // Handle errors
          console.error('Chat API error:', error);
          const errorMsg = error.message || 'Failed to send message. Please try again.';
          setError(errorMsg);
          setLoading(false);
          
          // Add error message to chat with helpful guidance
          let userFriendlyError = errorMsg;
          if (errorMsg.includes('Failed to connect') || errorMsg.includes('fetch')) {
            userFriendlyError = 'Failed to connect to backend server. Please ensure the backend is running on http://localhost:8000';
          } else if (errorMsg.includes('500')) {
            userFriendlyError = 'Backend server error. Please check backend logs for details. Common causes: missing OpenAI API key or crew initialization failure.';
          }
          
          const errorMessage: Message = {
            id: `msg-error-${Date.now()}`,
            role: 'system',
            content: `Error: ${userFriendlyError}`,
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
            ref={inputRef}
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
