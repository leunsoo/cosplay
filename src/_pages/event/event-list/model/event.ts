import {
  type OfficialEvent,
  type PersonalEvent,
  EventSource,
} from '@/entities/event';

// 목록에서 공식/개인 행사를 함께 다루기 위한 유니온 타입
// entities/event의 OfficialEvent/PersonalEvent는 여러 슬라이스에서 재사용되지만,
// 이 유니온과 타입가드는 지금 이 페이지(목록 화면)에서만 필요함
export type Event = OfficialEvent | PersonalEvent;

export function isOfficialEvent(event: Event): event is OfficialEvent {
  return event.source === EventSource.OFFICIAL;
}

export function isPersonalEvent(event: Event): event is PersonalEvent {
  return event.source === EventSource.PERSONAL;
}
