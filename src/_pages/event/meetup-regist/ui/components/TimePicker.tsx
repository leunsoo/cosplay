'use client';

import { useRef, useEffect } from 'react';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '10', '20', '30', '40', '50'];

export function TimePicker({
  value,
  onChange,
  open,
  onOpenChange,
}: TimePickerProps) {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const [hour, minute] = value ? value.split(':') : ['', ''];

  const displayTime = value
    ? (() => {
        const h = parseInt(hour, 10);
        const period = h < 12 ? '오전' : '오후';
        const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${period} ${displayHour}:${minute}`;
      })()
    : '시간 선택';

  // 드롭다운 열릴 때 선택된 항목으로 스크롤 (컨테이너 내부 스크롤만)
  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      if (hourRef.current && hour) {
        const el = hourRef.current.querySelector<HTMLElement>(
          `[data-hour="${hour}"]`
        );
        if (el) {
          hourRef.current.scrollTop =
            el.offsetTop -
            hourRef.current.clientHeight / 2 +
            el.clientHeight / 2;
        }
      }
      if (minuteRef.current && minute) {
        const el = minuteRef.current.querySelector<HTMLElement>(
          `[data-minute="${minute}"]`
        );
        if (el) {
          minuteRef.current.scrollTop =
            el.offsetTop -
            minuteRef.current.clientHeight / 2 +
            el.clientHeight / 2;
        }
      }
    }, 0);
  }, [open, hour, minute]);

  return (
    <div className="relative">
      {!open && (
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          className={`text-base pb-0.5 border-b-2 transition-colors outline-none ${
            open
              ? 'border-primary text-gray-900 font-bold'
              : 'border-gray-200 hover:border-gray-400'
          } ${value ? 'text-gray-900 font-bold' : 'text-gray-400 font-normal'}`}
        >
          {displayTime}
        </button>
      )}

      {open && (
        <div className="bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden flex">
          {/* 시 */}
          <div
            ref={hourRef}
            className="h-52 overflow-y-auto w-24 py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {HOURS.map((h) => {
              const hNum = parseInt(h, 10);
              const period = hNum < 12 ? '오전' : '오후';
              const display = hNum === 0 ? 12 : hNum > 12 ? hNum - 12 : hNum;
              const isSelected = h === hour;
              return (
                <button
                  key={h}
                  type="button"
                  data-hour={h}
                  onClick={() => onChange(`${h}:${minute || '00'}`)}
                  className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                    isSelected
                      ? 'bg-primary text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {period} {display}시
                </button>
              );
            })}
          </div>

          {/* 구분선 */}
          <div className="w-px bg-gray-100" />

          {/* 분 */}
          <div
            ref={minuteRef}
            className="h-58 overflow-y-auto w-20 py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {MINUTES.map((m) => {
              const isSelected = m === minute;
              return (
                <button
                  key={m}
                  type="button"
                  data-minute={m}
                  onClick={() => {
                    onChange(`${hour || '00'}:${m}`);
                    onOpenChange(false);
                  }}
                  className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                    isSelected
                      ? 'bg-primary text-white font-bold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {m}분
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
