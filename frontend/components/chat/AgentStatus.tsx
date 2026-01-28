'use client';

import { AgentStatus as AgentStatusType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AgentStatusProps {
  agent: AgentStatusType;
  className?: string;
}

export function AgentStatus({ agent, className }: AgentStatusProps) {
  const statusColors = {
    idle: 'bg-gray-200 text-gray-700',
    processing: 'bg-blue-200 text-blue-700',
    waiting: 'bg-yellow-200 text-yellow-700',
    error: 'bg-red-200 text-red-700',
  };

  const statusLabels = {
    idle: 'Idle',
    processing: 'Processing',
    waiting: 'Waiting',
    error: 'Error',
  };

  return (
    <div 
      className={cn('flex items-center gap-2 px-3 py-2 rounded-md bg-gray-50', className)}
      role="status"
      aria-live="polite"
      aria-label={`Agent status: ${agent.name} is ${statusLabels[agent.status]}`}
    >
      <div className="flex items-center gap-2">
        <div 
          className={cn('w-2 h-2 rounded-full', statusColors[agent.status])}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-gray-900">{agent.name}</span>
      </div>
      <span 
        className={cn('text-xs px-2 py-1 rounded font-medium', statusColors[agent.status])}
        aria-label={`Status: ${statusLabels[agent.status]}`}
      >
        {statusLabels[agent.status]}
      </span>
      {agent.currentTask && (
        <span className="text-xs text-gray-600" aria-label={`Current task: ${agent.currentTask}`}>
          • {agent.currentTask}
        </span>
      )}
    </div>
  );
}
