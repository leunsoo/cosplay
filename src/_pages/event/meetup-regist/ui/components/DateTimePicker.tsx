'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { format, parse, isValid } from 'date-fns';
import { TimePicker } from './TimePicker';
import 'react-day-picker/style.css';

function RequiredLabel({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      {children}
      <span className="text-red-500 leading-none">*</span>
    </p>
  );
}

interface DateTimePickerProps {
  value: string; // "YYYY-MM-DD" 또는 ""
  timeValue: string; // "HH:mm" 또는 ""
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const boxClass =
  'w-full flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-3 text-sm cursor-pointer hover:border-gray-400 transition-colors outline-none text-left';

export function DateTimePicker({
  value,
  timeValue,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const [openPicker, setOpenPicker] = useState<'date' | 'time' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;

  const displayDate =
    selected && isValid(selected)
      ? format(selected, 'yyyy.MM.dd.')
      : '날짜 선택';

  const displayTime = timeValue
    ? (() => {
        const [h] = timeValue.split(':');
        const hNum = parseInt(h, 10);
        const period = hNum < 12 ? '오전' : '오후';
        const display = hNum === 0 ? 12 : hNum > 12 ? hNum - 12 : hNum;
        const [, m] = timeValue.split(':');
        return `${period} ${display}:${m}`;
      })()
    : '시간 선택';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenPicker(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="flex gap-4">
      {/* 날짜 */}
      <div className="flex-1 flex flex-col gap-1 relative">
        <RequiredLabel>날짜</RequiredLabel>
        <button
          type="button"
          onClick={() =>
            setOpenPicker((prev) => (prev === 'date' ? null : 'date'))
          }
          className={`${boxClass} ${!value ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
        >
          <span className="material-symbols-outlined text-[18px] text-gray-500 leading-none">
            calendar_month
          </span>
          {displayDate}
        </button>

        {openPicker === 'date' && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(day) => {
                if (day) {
                  onDateChange(format(day, 'yyyy-MM-dd'));
                  setOpenPicker(null);
                }
              }}
              locale={ko}
              classNames={{
                root: 'text-sm',
                months: 'flex flex-col',
                month: 'space-y-3',
                month_caption:
                  'flex justify-center items-center h-8 font-bold text-gray-900 text-base',
                nav: 'flex items-center justify-between absolute top-4 left-4 right-4',
                button_previous:
                  'p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600',
                button_next:
                  'p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600',
                month_grid: 'w-full border-collapse',
                weekdays: 'flex',
                weekday:
                  'text-gray-400 font-medium text-xs w-9 text-center py-1',
                week: 'flex mt-1',
                day: 'w-9 h-9 text-center',
                day_button:
                  'w-9 h-9 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors outline-none',
                selected:
                  '[&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary',
                today: '[&>button]:font-black [&>button]:text-primary',
                outside: '[&>button]:text-gray-300',
                disabled:
                  '[&>button]:text-gray-200 [&>button]:cursor-not-allowed',
              }}
            />
          </div>
        )}
      </div>

      {/* 시간 */}
      <div className="flex-1 flex flex-col gap-1 relative">
        <RequiredLabel>시간</RequiredLabel>
        <button
          type="button"
          onClick={() =>
            setOpenPicker((prev) => (prev === 'time' ? null : 'time'))
          }
          className={`${boxClass} ${!timeValue ? 'text-gray-400' : 'text-gray-800 font-medium'}`}
        >
          <span className="material-symbols-outlined text-[18px] text-gray-500 leading-none">
            schedule
          </span>
          {displayTime}
        </button>

        {openPicker === 'time' && (
          <div className="absolute top-full left-0 mt-2 z-50">
            <TimePicker
              value={timeValue}
              onChange={(t) => {
                onTimeChange(t);
              }}
              open
              onOpenChange={(o) => {
                if (!o) setOpenPicker(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
