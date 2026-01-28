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
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Status</CardTitle>
        <CardDescription>
          Track your onboarding progress and required tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressIndicator progress={status.progress} size="lg" />

        <div className="space-y-2">
          <p className="text-sm font-medium">Tasks</p>
          {status.tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border',
                getStatusColor(task.status)
              )}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(task.status)}
                <div>
                  <p className="text-sm font-medium">{task.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {task.category} • {task.dueDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium capitalize">{task.status}</span>
            </div>
          ))}
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
