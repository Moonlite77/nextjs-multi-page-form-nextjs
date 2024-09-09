import React from 'react';
import PageHeader from '@/components/PageHeader';
import StepNavigation from '@/components/StepNavigation';
import { AddDealContextProvider } from '@/contexts/addDealContext';

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block w-full h-full">
      <PageHeader
        title="Create Avatar"
        subtitle="Answer a few questions and we'll make you a unique Avatar"
      />

      <div className="grid grid-cols gap-x-16 text-white lg:flex-row">
        <StepNavigation />
        <AddDealContextProvider>
          <div className="w-full">{children}</div>
        </AddDealContextProvider>
      </div>
    </div>
  );
}
