'use client';

import { useState, type ReactNode } from 'react';
import { EventTabs, type EventTabType } from './EventTabs';

interface EventTabsSectionProps {
  detailsContent: ReactNode;
  communityContent: ReactNode;
}

// 탭 전환 상태만 소유하는 leaf. 두 탭의 실제 콘텐츠는 부모(서버 컴포넌트)가
// 구성해서 prop으로 넘겨주므로, 이 컴포넌트가 client여도 그 콘텐츠 자체는
// 계속 서버에서 렌더링된다 (SummaryCardShell과 동일한 Composition Pattern).
export function EventTabsSection({
  detailsContent,
  communityContent,
}: EventTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<EventTabType>('details');

  return (
    <>
      <EventTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'details' && (
        <div className="px-2 md:px-0 space-y-6 md:space-y-12">
          {detailsContent}
        </div>
      )}

      {activeTab === 'community' && (
        <div className="px-2 md:px-0 space-y-6 md:space-y-12">
          {communityContent}
        </div>
      )}
    </>
  );
}
