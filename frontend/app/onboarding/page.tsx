'use client';

import { StatusCard } from '@/components/onboarding/StatusCard';
import { DocumentUpload } from '@/components/onboarding/DocumentUpload';
import { mockOnboardingStatus } from '@/lib/constants';

/**
 * Onboarding Dashboard Page
 * 
 * Displays onboarding status and document upload interface.
 * Responsive design for mobile, tablet, and desktop.
 * 
 * Reference: PRD Section 4 - Functional Requirements, SAD Section 4.2
 */
export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-gray-50" role="main" aria-label="Onboarding dashboard">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Onboarding Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your onboarding progress and submit required documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <StatusCard status={mockOnboardingStatus} />
          <DocumentUpload />
        </div>
      </div>
    </main>
  );
}
