'use client';

import { useQuery } from '@tanstack/react-query';
import { MEETUP_QUERIES, getMeetupDetail } from '@/shared/api/endpoints/meetup';
import { MeetUpRegistPage } from './MeetUpRegistPage';
import type { MeetupFormData } from '../model/meetup-form';

interface MeetUpEditPageProps {
  meetupId: number;
}

function buildInitialData(
  detail: Awaited<ReturnType<typeof getMeetupDetail>>['data']
): MeetupFormData {
  const date = new Date(detail.scheduledAt);
  const eventDate = date.toISOString().slice(0, 10);
  const eventTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return {
    title: detail.title,
    description: detail.description,
    eventDate,
    eventTime,
    location: detail.location,
    locationDetail: detail.locationDetail ?? '',
    maxMembers: String(detail.maxMembers),
    thumbnailFile: null,
    thumbnailPreview: detail.thumbnailUrl ?? '',
  };
}

export function MeetUpEditPage({ meetupId }: MeetUpEditPageProps) {
  const { data, isLoading, error } = useQuery(MEETUP_QUERIES.detail(meetupId));

  if (isLoading) {
    return (
      <main className="flex-1 container-custom py-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !data?.data) {
    return (
      <main className="flex-1 container-custom py-8 flex items-center justify-center">
        <p className="text-gray-600 font-medium">
          개인 행사 정보를 불러오는데 실패했습니다.
        </p>
      </main>
    );
  }

  return (
    <MeetUpRegistPage
      meetupId={meetupId}
      initialData={buildInitialData(data.data)}
    />
  );
}
