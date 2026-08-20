'use client';

import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { useMeetupFormState } from '../model/use-meetup-form-state';
import { useRegistMeetup } from '../api/use-regist-meetup';
import { MeetupForm } from './MeetupForm';

export function MeetupRegistPage() {
  const {
    formData,
    handleChange,
    handleDateChange,
    handleTimeChange,
    handleImageUpload,
    handleImageRemove,
    handleLocationChange,
  } = useMeetupFormState();
  const { submit, isPending } = useRegistMeetup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(formData);
  };

  return (
    <main className="flex-1 container-custom py-8">
      <div className="hidden md:block mb-8 text-left">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          개인 행사 등록하기
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
            href={ROUTES.HOME}
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
              <>등록 중...</>
            ) : (
              <>
                등록하기{' '}
                <span className="material-symbols-outlined">check</span>
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
