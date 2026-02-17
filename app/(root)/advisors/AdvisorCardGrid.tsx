'use client';

import type { AdvisorCardData } from './AdvisorCard';
import AdvisorCard from './AdvisorCard';

interface AdvisorCardGridProps {
  advisors: AdvisorCardData[];
}

export default function AdvisorCardGrid({ advisors }: AdvisorCardGridProps) {
  return (
    <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-[72px]">
      {advisors.map((advisor) => (
        <AdvisorCard key={advisor.id} advisor={advisor} />
      ))}
    </div>
  );
}
