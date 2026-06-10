'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/core/config/routes';
import { EventGroupChat } from '@/features/event-group-chat';
import { getEventDetail } from './api';
import { mapEventDetailDtoToEventDetailWithUploader } from './model';
import {
  EventHeader,
  EventTabs,
  EventAbout,
  EventSchedule,
  EventLocation,
  type EventTabType,
} from './ui';

interface EventDetailViewProps {
  eventId: string;
}

export function EventDetailView({ eventId }: EventDetailViewProps) {
  const [activeTab, setActiveTab] = useState<EventTabType>('details');

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEventDetail({ eventId: Number(eventId) }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">행사 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            행사를 찾을 수 없습니다
          </h1>
          <Link href={ROUTES.HOME} className="text-primary hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { event } = mapEventDetailDtoToEventDetailWithUploader(data.data);

  return (
    <main className="flex-1 container-custom pt-8 md:pb-20">
      <div className="space-y-4 md:space-y-8">
        <EventHeader event={event} />

        <EventTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'details' && (
          <div className="px-2 md:px-0 space-y-6 md:space-y-12">
            <EventAbout description={event.description} />
            {event.schedules && event.schedules.length > 0 && (
              <EventSchedule schedules={event.schedules} />
            )}
            {event.location && <EventLocation location={event.location} />}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="px-2 md:px-0 space-y-6 md:space-y-12">
            <EventGroupChat eventId={eventId} eventStatus={event.status} />
          </div>
        )}
      </div>
    </main>
  );
}
