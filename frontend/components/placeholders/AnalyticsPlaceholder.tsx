'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AnalyticsPlaceholder() {
  return (
    <Card className="opacity-50">
      <CardHeader>
        <CardTitle>Analytics & Insights</CardTitle>
        <CardDescription>Coming soon in Phase 2</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-400">Chart visualization placeholder</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400 text-sm">Metric 1</p>
            </div>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400 text-sm">Metric 2</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Advanced analytics features including completion time analysis, bottleneck identification, and predictive insights will be available in future releases.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
