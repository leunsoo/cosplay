import type { Event } from '../model/event';

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
