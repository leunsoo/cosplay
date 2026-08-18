import { EventStatus } from '../model/event';

const RAW_TO_STATUS: Record<string, EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

const STATUS_TO_RAW: Record<EventStatus, string> = {
  [EventStatus.UPCOMING]: 'UPCOMING',
  [EventStatus.ONGOING]: 'ONGOING',
  [EventStatus.ENDED]: 'CLOSED',
};

// 백엔드 원시 상태 문자열 → EventStatus
export function parseEventStatus(raw: string): EventStatus {
  return RAW_TO_STATUS[raw] ?? EventStatus.UPCOMING;
}

// EventStatus → 백엔드가 기대하는 원시 상태 문자열
export function serializeEventStatus(status: EventStatus): string {
  return STATUS_TO_RAW[status];
}
