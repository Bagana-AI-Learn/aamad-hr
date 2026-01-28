'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressIndicator } from './ProgressIndicator';
import { OnboardingStatus } from '@/lib/types';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  status: OnboardingStatus;
}

export function StatusCard({ status }: StatusCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'text-success border-success';
      case 'in-progress':
        return 'text-warning border-warning';
      case 'error':
        return 'text-error border-error';
      default:
        return 'text-gray-400 border-gray-300';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">Onboarding Status</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Track your onboarding progress and required tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <ProgressIndicator progress={status.progress} size="lg" />

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-900">Tasks</p>
          <div className="space-y-2">
            {status.tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'flex items-start sm:items-center justify-between p-2 sm:p-3 rounded-lg border gap-2',
                  getStatusColor(task.status)
                )}
                role="listitem"
                aria-label={`Task: ${task.name}, Status: ${task.status}`}
              >
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.name}</p>
                    <p className="text-xs text-gray-500 capitalize mt-0.5">
                      <span className="hidden sm:inline">{task.category} • </span>
                      {task.dueDate?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span 
                  className="text-xs font-medium capitalize flex-shrink-0 px-2 py-1 rounded"
                  aria-label={`Status: ${task.status}`}
                >
                  {task.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500">
            Last updated: {status.lastUpdated.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
