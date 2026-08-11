import type { EventStatusParam } from '@/shared/api/event';
import type { MeetupStatus } from '@/shared/api/meetup';

export type EventSourceTab = '공식' | '개인';

export const EVENT_SOURCE_TABS: EventSourceTab[] = ['공식', '개인'];

export const STATUS_LABEL_TO_EVENT_STATUS: Record<string, EventStatusParam> = {
  전체: 'ALL',
  예정: 'UPCOMING',
  진행중: 'ONGOING',
  종료됨: 'CLOSED',
};

export const STATUS_LABEL_TO_MEETUP_STATUS: Record<string, MeetupStatus> = {
  전체: 'ALL',
  진행중: 'ONGOING',
  종료됨: 'CLOSED',
};

const STATUS_LABEL_MAP_BY_SOURCE: Record<
  EventSourceTab,
  Record<string, string>
> = {
  공식: STATUS_LABEL_TO_EVENT_STATUS,
  개인: STATUS_LABEL_TO_MEETUP_STATUS,
};

export function getStatusOptions(source: EventSourceTab): string[] {
  return Object.keys(STATUS_LABEL_MAP_BY_SOURCE[source]);
}
