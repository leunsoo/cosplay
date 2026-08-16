import type { OfficialEvent } from '@/entities/event';

// 공식 행사 상세 (상세 페이지 전용) — entities/event의 OfficialEvent는 여러 슬라이스가
// 공유하지만, 상세 화면 전용 필드(description/schedules)는 이 페이지에서만 쓰임
export interface OfficialEventDetail extends OfficialEvent {
  description?: string; // 긴 설명 (About the Event)
  schedules?: Array<{
    content: string;
    date: string; // "2026-03-14"
    time: string; // "09:00"
  }>;
}
