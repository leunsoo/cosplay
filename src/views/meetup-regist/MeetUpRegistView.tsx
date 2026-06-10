'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/core/config/routes';
import {
  type MeetupFormData,
  INITIAL_FORM_DATA,
  useMeetUpRegist,
} from './model';
import { useUpdateMeetup } from './model/hooks/useUpdateMeetup';
import { EventForm } from './ui/components';

interface MeetUpRegistViewProps {
  /** 수정 모드일 때 meetupId를 전달 */
  meetupId?: number;
  /** 수정 모드일 때 초기값을 전달 */
  initialData?: MeetupFormData;
}

export function MeetUpRegistView({
  meetupId,
  initialData,
}: MeetUpRegistViewProps) {
  const isEditMode = !!meetupId;
  const [formData, setFormData] = useState<MeetupFormData>(
    initialData ?? INITIAL_FORM_DATA
  );
  const { submit, isPending } = useMeetUpRegist();
  const { update, isPending: isUpdatePending } = useUpdateMeetup(meetupId);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, eventDate: date }));
  };

  const handleTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, eventTime: time }));
  };

  const handleImageUpload = (file: File, preview: string) => {
    setFormData((prev) => ({
      ...prev,
      thumbnailFile: file,
      thumbnailPreview: preview,
    }));
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnailFile: null,
      thumbnailPreview: '',
    }));
  };

  const handleLocationChange = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      update(formData);
    } else {
      submit(formData);
    }
  };

  const pending = isEditMode ? isUpdatePending : isPending;

  return (
    <main className="flex-1 container-custom py-8">
      <div className="hidden md:block mb-8 text-left">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          {isEditMode ? '개인 행사 수정하기' : '개인 행사 등록하기'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <EventForm
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
            href={isEditMode ? ROUTES.MEETUP.DETAIL(meetupId) : ROUTES.HOME}
            className="bg-white border border-gray-200 text-gray-700 font-semibold py-4 px-10 rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span> 취소
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? (
              <>{isEditMode ? '수정 중...' : '등록 중...'}</>
            ) : (
              <>
                {isEditMode ? '수정하기' : '등록하기'}{' '}
                <span className="material-symbols-outlined">check</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
