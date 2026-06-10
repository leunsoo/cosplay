/**
 * ISO datetime 문자열을 채팅용 타임스탬프로 포맷팅
 * @example "2026-02-04T15:30:00Z" → "오후 3:30"
 */
export function formatChatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 || 12;
  return `${period} ${displayHours}:${String(minutes).padStart(2, '0')}`;
}
