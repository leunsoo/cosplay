'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatEventDate } from '@/entities/event';
import { type Event, isOfficialEvent, isPersonalEvent } from '../model/event';
import { getEventsForDate, generateCalendarDays } from '../lib/calendar';
import { isSameMonth, isToday } from '@/shared/lib/dateTime';
import { ROUTES } from '@/shared/routes';

interface DayModal {
  date: Date;
  events: Event[];
}

interface EventCalendarViewProps {
  events: Event[];
}

function EventCompactCard({ event }: { event: Event }) {
  const href = isOfficialEvent(event)
    ? ROUTES.EVENT.DETAIL(event.id)
    : ROUTES.MEETUP.DETAIL(event.id);

  return (
    <Link
      href={href}
      className="flex items-start p-3 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
          {event.title}
        </p>
        <p className="text-xs text-gray-800 truncate">
          <span className="font-medium text-gray-400 mr-1">날짜</span>
          {formatEventDate(event.dateInfo)}
        </p>
        <p className="text-xs text-gray-800 truncate">
          <span className="font-medium text-gray-400 mr-1">장소</span>
          {event.location}
        </p>
        {isOfficialEvent(event) && (
          <p className="text-xs text-gray-800 truncate">
            <span className="font-medium text-gray-400 mr-1">금액</span>
            {event.price === 0 ? '무료' : `${event.price.toLocaleString()}원`}
          </p>
        )}
        {isPersonalEvent(event) && (
          <p className="text-xs text-gray-800 truncate">
            <span className="font-medium text-gray-400 mr-1">인원</span>
            {event.currentMembers} / {event.maxMembers} 명
          </p>
        )}
      </div>
    </Link>
  );
}

export function EventCalendarView({ events }: EventCalendarViewProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [dayModal, setDayModal] = useState<DayModal | null>(null);

  const changeMonth = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      const now = new Date();
      setCurrentYear(now.getFullYear());
      setCurrentMonth(now.getMonth());
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentYear((prev) => prev - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentYear((prev) => prev + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-card p-4 md:p-6">
      {/* 달력 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-slate-900">
            {currentYear}년 {currentMonth + 1}월
          </h3>
          <div className="flex gap-2 items-center rounded-lg p-0.5">
            <button
              onClick={() => changeMonth('prev')}
              className="w-9 h-9 flex items-center bg-gray-100 justify-center hover:bg-gray-200 rounded-md transition-colors text-gray-500 hover:text-primary shadow-sm"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '20px', lineHeight: 1 }}
              >
                chevron_left
              </span>
            </button>
            <button
              onClick={() => changeMonth('next')}
              className="w-9 h-9 flex items-center bg-gray-100 justify-center hover:bg-gray-200 rounded-md transition-colors text-gray-500 hover:text-primary shadow-sm"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '20px', lineHeight: 1 }}
              >
                chevron_right
              </span>
            </button>
          </div>
          <button
            onClick={() => changeMonth('today')}
            className="text-xs font-medium text-gray-500 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
          >
            오늘
          </button>
        </div>
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {/* 요일 헤더 */}
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-red-500">
          일
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-700">
          월
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-700">
          화
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-700">
          수
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-700">
          목
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-gray-700">
          금
        </div>
        <div className="bg-gray-50 p-2 text-center text-xs font-bold text-blue-500">
          토
        </div>

        {/* 날짜 칸들 */}
        {generateCalendarDays(currentYear, currentMonth).map((day, index) => {
          const dayEvents = getEventsForDate(events, day);
          const isCurrentMonth = isSameMonth(day, currentYear, currentMonth);
          const isTodayDate = isToday(day);
          const dayOfWeek = day.getDay();
          const hasMore = dayEvents.length > 2;

          return (
            <div
              key={index}
              onClick={() => setDayModal({ date: day, events: dayEvents })}
              className="bg-white min-h-25 p-1 md:p-2 transition-colors cursor-pointer hover:bg-primary/5"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    minHeight: '24px',
                    borderRadius: '50%',
                  }}
                  className={`inline-flex items-center justify-center text-sm font-medium ${
                    isTodayDate
                      ? 'bg-red-500 text-white font-bold'
                      : !isCurrentMonth
                        ? 'text-gray-300'
                        : dayOfWeek === 0
                          ? 'text-red-500'
                          : dayOfWeek === 6
                            ? 'text-blue-500'
                            : 'text-gray-700'
                  }`}
                >
                  {day.getDate()}
                </span>
                {hasMore && (
                  <span className="text-[9px] font-medium text-primary leading-none">
                    +{dayEvents.length - 2}개
                  </span>
                )}
              </div>

              {dayEvents.slice(0, 2).map((event, idx) => (
                <div
                  key={idx}
                  className={`px-1.5 py-1 rounded text-[10px] leading-[1.2] font-bold border-l-2 border-primary mb-1 truncate bg-gray-100 ${
                    !isCurrentMonth ? 'text-gray-400' : 'text-slate-900'
                  }`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* 더보기 모달 */}
      {dayModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDayModal(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-96 max-h-[70vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-slate-900 text-sm">
                {dayModal.date.getMonth() + 1}월 {dayModal.date.getDate()}일
                행사 ({dayModal.events.length})
              </span>
              <button
                onClick={() => setDayModal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
            <div className="overflow-y-auto p-3 space-y-2">
              {dayModal.events.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-6">
                  이 날은 행사가 없습니다.
                </p>
              ) : (
                dayModal.events.map((event, idx) => (
                  <EventCompactCard key={idx} event={event} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
