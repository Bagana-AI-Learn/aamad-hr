'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SettingsPlaceholder() {
  return (
    <Card className="opacity-50">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Coming soon in Phase 2</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">User Preferences</h3>
          <div className="space-y-2 pl-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Notifications</span>
              <Button variant="ghost" size="sm" disabled>
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Language</span>
              <Button variant="ghost" size="sm" disabled>
                Select
              </Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Theme</span>
              <Button variant="ghost" size="sm" disabled>
                Change
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          User settings and preferences will be available in future releases.
        </p>
      </CardContent>
    </Card>
  );
}
