import type { EventDate, Event } from '../types';
import { EventStatus } from '../types';

/**
 * 날짜를 한국어 표시 형식으로 변환 (EventDate 객체를 받음)
 * @example formatEventDate({ startDate: new Date('2024-08-24'), endDate: new Date('2024-08-26') })
 *          → "8.24(토) - 8.26(월)"
 */
export function formatEventDate(dateInfo: EventDate): string {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const formatSingleDate = (date: Date, includeTime: boolean = false) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = dayNames[date.getDay()];
    const time =
      includeTime && dateInfo.startTime ? ` ${dateInfo.startTime}` : '';
    return `${month}.${day}(${dayName})${time}`;
  };

  const { startDate, endDate, startTime } = dateInfo;

  if (!endDate || startDate.toDateString() === endDate.toDateString()) {
    return formatSingleDate(startDate, !!startTime);
  }

  return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
}

/**
 * 이벤트 상태에 따른 색상 클래스 반환
 */
export function getStatusColor(status: EventStatus): {
  bg: string;
  border: string;
  text: string;
} {
  switch (status) {
    case EventStatus.ONGOING:
      return {
        bg: 'bg-green-500',
        border: 'border-green-500',
        text: 'text-white',
      };
    case EventStatus.ENDED:
      return {
        bg: 'bg-gray-500',
        border: 'border-gray-500',
        text: 'text-white',
      };
    default: // UPCOMING
      return { bg: 'bg-primary', border: 'border-primary', text: 'text-white' };
  }
}

/**
 * 특정 날짜에 해당하는 이벤트 필터링
 */
export function getEventsForDate(events: Event[], targetDate: Date): Event[] {
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const start = new Date(event.dateInfo.startDate);
    start.setHours(0, 0, 0, 0);

    const end = event.dateInfo.endDate
      ? new Date(event.dateInfo.endDate)
      : start;
    end.setHours(0, 0, 0, 0);

    return target >= start && target <= end;
  });
}

/**
 * 특정 월의 캘린더 그리드 생성 (6주 x 7일 = 42칸)
 */
export function generateCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);

  // 첫 주의 시작일 (일요일부터 시작)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // 42일 배열 생성 (6주)
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }

  return days;
}
