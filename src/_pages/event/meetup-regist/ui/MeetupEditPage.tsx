'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '@/shared/routes';
import { MEETUP_QUERIES, getMeetupDetail } from '@/shared/api/endpoints/meetup';
import { useMeetupFormState } from '../model/use-meetup-form-state';
import { useUpdateMeetup } from '../api/use-update-meetup';
import { MeetupForm } from './MeetupForm';
import type { MeetupFormData } from '../model/meetup-form';

interface MeetupEditPageProps {
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

export function MeetupEditPage({ meetupId }: MeetupEditPageProps) {
  const { data, isLoading, error } = useQuery(MEETUP_QUERIES.detail(meetupId));
  const {
    formData,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleLocationChange,
  } = useMeetupFormState(data?.data ? buildInitialData(data.data) : undefined);
  const { update, isPending } = useUpdateMeetup(meetupId);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(formData);
  };

  return (
    <main className="flex-1 container-custom py-8">
      <div className="hidden md:block mb-8 text-left">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          개인 행사 수정하기
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <MeetupForm
          formData={formData}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          onLocationChange={handleLocationChange}
        />

        <div className="flex justify-between pt-2">
          <Link
            href={ROUTES.MEETUP.DETAIL(meetupId)}
            className="bg-white border border-gray-200 text-gray-700 font-semibold py-4 px-10 rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span> 취소
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>수정 중...</>
            ) : (
              <>
                수정하기{' '}
                <span className="material-symbols-outlined">check</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
