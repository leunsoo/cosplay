'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { useLogined } from '@/entities/auth';

interface EventListHeaderProps {
  isCalendarView: boolean;
  onViewModeChange: (isCalendar: boolean) => void;
  selectedSource: '공식' | '개인';
}

export function EventListHeader({
  isCalendarView,
  onViewModeChange,
  selectedSource,
}: EventListHeaderProps) {
  const router = useRouter();
  const isLogined = useLogined();

  return (
    <section className="sticky top-16 z-30 bg-background-light/95 backdrop-blur-sm pt-2 pb-4 border-b border-gray-200/60">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">행사 목록</h3>
        <div className="flex items-center gap-2">
          {selectedSource === '개인' && isLogined && (
            <button
              onClick={() => router.push(ROUTES.EVENT.REGISTER)}
              className="px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              개인 행사 등록
            </button>
          )}
          <div className="hidden md:flex bg-gray-200 rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => onViewModeChange(false)}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${
                !isCalendarView
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                format_list_bulleted
              </span>
              리스트
            </button>
            <button
              onClick={() => onViewModeChange(true)}
              className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors ${
                isCalendarView
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                calendar_month
              </span>
              달력
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
