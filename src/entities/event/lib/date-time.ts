import type { EventDate } from '../model/event';
import { EventStatus } from '../model/event';

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
