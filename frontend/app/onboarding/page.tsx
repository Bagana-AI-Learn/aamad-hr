'use client';

import { StatusCard } from '@/components/onboarding/StatusCard';
import { DocumentUpload } from '@/components/onboarding/DocumentUpload';
import { mockOnboardingStatus } from '@/lib/constants';

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Onboarding Dashboard</h1>
          <p className="text-gray-600">Track your onboarding progress and submit required documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusCard status={mockOnboardingStatus} />
          <DocumentUpload />
        </div>
      </div>
    </main>
  );
}
