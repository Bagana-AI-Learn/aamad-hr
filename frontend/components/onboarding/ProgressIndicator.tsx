'use client';

import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressIndicator({ progress, size = 'md', className }: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)} role="region" aria-label="Onboarding progress">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700" id="progress-label">
          Progress
        </span>
        <span 
          className="text-sm font-semibold text-blue-600" 
          aria-live="polite"
          aria-atomic="true"
        >
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden" role="presentation">
        <div
          className={cn(
            'bg-blue-600 transition-all duration-500 ease-out rounded-full',
            sizeClasses[size]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-labelledby="progress-label"
          aria-label={`Onboarding progress: ${progress}%`}
        />
      </div>
    </div>
  );
}
