/**
 * D-day 계산
 * @example calculateDDay(new Date('2024-08-26')) → "D-2" (오늘이 8월 24일이라면)
 */
export function calculateDDay(targetDate: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '내일';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}

/**
 * 날짜가 현재 월에 속하는지 확인
 */
export function isSameMonth(date: Date, year: number, month: number): boolean {
  return date.getFullYear() === year && date.getMonth() === month;
}

/**
 * 오늘 날짜인지 확인
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * 등록 날짜를 상대 시간으로 표시
 * @param registeredDate - 등록된 날짜
 * @returns "방금 전", "n분 전", "n시간 전", "n일 전"
 */
export function getRelativeTime(registeredDate: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - registeredDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return '방금 전';
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  return `${diffInDays}일 전`;
}
