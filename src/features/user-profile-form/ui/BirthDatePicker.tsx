'use client';

import { useState, useRef, useEffect } from 'react';
import { format, getDaysInMonth, isValid, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

type ViewMode = 'day' | 'month' | 'year';

interface BirthDatePickerProps {
  value: string; // "YYYY-MM-DD" 또는 ""
  onChange: (date: string) => void;
  disabled?: boolean;
}

const MONTHS_KO = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1949 },
  (_, i) => CURRENT_YEAR - i
);

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const prevDays = getDaysInMonth(new Date(year, month - 1));

  const cells: { day: number; current: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevDays - i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false });
  }

  return cells;
}

export function BirthDatePicker({
  value,
  onChange,
  disabled = false,
}: BirthDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [viewYear, setViewYear] = useState<number>(() => {
    if (value) {
      const d = parse(value, 'yyyy-MM-dd', new Date());
      if (isValid(d)) return d.getFullYear();
    }
    return 2000;
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    if (value) {
      const d = parse(value, 'yyyy-MM-dd', new Date());
      if (isValid(d)) return d.getMonth();
    }
    return 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : null;
  const isSelectedValid = selected && isValid(selected);

  const displayDate = isSelectedValid
    ? format(selected, 'yyyy년 M월 d일', { locale: ko })
    : '생년월일 선택';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (viewMode !== 'year' || !yearListRef.current) return;
    setTimeout(() => {
      const el = yearListRef.current?.querySelector('[data-selected="true"]');
      el?.scrollIntoView({ block: 'center' });
    }, 0);
  }, [viewMode]);

  const handleOpen = () => {
    if (disabled) return;
    if (isSelectedValid) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
    setViewMode('day');
    setOpen((prev) => !prev);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  };

  const handleDayClick = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    onChange(format(date, 'yyyy-MM-dd'));
    setOpen(false);
  };

  const cells = buildCalendarDays(viewYear, viewMonth);
  const today = new Date();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={`w-full px-4 py-3 rounded-xl border text-left text-sm transition-all outline-none ${
          disabled
            ? 'bg-gray-50 text-gray-500 border-gray-200 cursor-default'
            : open
              ? 'border-primary ring-2 ring-primary'
              : 'border-gray-200 hover:border-gray-300'
        } ${!value ? 'text-gray-400' : 'text-gray-900'}`}
      >
        {displayDate}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-72">
          {/* ── 년도 선택 ── */}
          {viewMode === 'year' && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-bold text-gray-900 text-sm">
                  년도 선택
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('day')}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
              <div
                ref={yearListRef}
                className="h-64 overflow-y-auto py-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {YEARS.map((year) => {
                  const isSelected = viewYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      data-selected={isSelected}
                      onClick={() => {
                        setViewYear(year);
                        setViewMode('month');
                      }}
                      className={`w-full px-5 py-2.5 text-sm text-left transition-colors ${
                        isSelected
                          ? 'bg-primary text-white font-bold'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {year}년
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── 월 선택 ── */}
          {viewMode === 'month' && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setViewMode('year')}
                  className="flex items-center gap-1 font-bold text-gray-900 hover:text-primary transition-colors text-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>
                  {viewYear}년
                </button>
                <span className="text-xs text-gray-400">월 선택</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-4">
                {MONTHS_KO.map((label, i) => {
                  const isSelected = viewMonth === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setViewMonth(i);
                        setViewMode('day');
                      }}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-primary text-white font-bold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── 날짜 선택 ── */}
          {viewMode === 'day' && (
            <div className="p-3">
              {/* 헤더 */}
              <div className="relative flex items-center justify-center h-10 mb-1">
                <button
                  type="button"
                  onClick={() => setViewMode('year')}
                  className="flex items-center gap-1 font-bold text-gray-900 hover:text-primary hover:bg-gray-100 transition-colors text-sm px-2.5 py-1 rounded-lg"
                >
                  {viewYear}년 {MONTHS_KO[viewMonth]}
                  <span className="material-symbols-outlined text-[16px]">
                    expand_more
                  </span>
                </button>
                <button
                  type="button"
                  onClick={prevMonth}
                  className="absolute left-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="absolute right-0 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* 요일 */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d, i) => (
                  <div
                    key={d}
                    className={`text-xs font-medium text-center py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'}`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7">
                {cells.map((cell, idx) => {
                  const isToday =
                    cell.current &&
                    today.getFullYear() === viewYear &&
                    today.getMonth() === viewMonth &&
                    today.getDate() === cell.day;
                  const isSel =
                    isSelectedValid &&
                    cell.current &&
                    selected.getFullYear() === viewYear &&
                    selected.getMonth() === viewMonth &&
                    selected.getDate() === cell.day;
                  const col = idx % 7;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!cell.current}
                      onClick={() => cell.current && handleDayClick(cell.day)}
                      className={`w-9 h-9 rounded-xl text-sm transition-colors outline-none mx-auto flex items-center justify-center
                        ${!cell.current ? 'text-gray-300 cursor-default' : ''}
                        ${cell.current && !isSel ? 'hover:bg-gray-100' : ''}
                        ${isSel ? 'bg-primary text-white font-bold' : ''}
                        ${isToday && !isSel ? 'font-black text-primary' : ''}
                        ${cell.current && !isSel && col === 0 ? 'text-red-400' : ''}
                        ${cell.current && !isSel && col === 6 ? 'text-blue-400' : ''}
                      `}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
