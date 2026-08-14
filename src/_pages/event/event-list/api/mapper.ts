import type { EventDTO } from '@/shared/api/event';
import type { MeetupItemDTO } from './get-meetup-list';
import {
  type OfficialEvent,
  type PersonalEvent,
  EventStatus,
  EventSource,
} from '@/entities/event';

const eventStatusMap: Record<'UPCOMING' | 'ONGOING' | 'CLOSED', EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

/** 공식 행사 목록 API DTO → 프론트엔드 Event 변환 */
export function mapEventDtoToEvent(dto: EventDTO): OfficialEvent {
  return {
    id: String(dto.eventId),
    imageUrl: dto.thumbnailUrl,
    category: dto.category,
    status: eventStatusMap[dto.status],
    source: EventSource.OFFICIAL,
    dateInfo: {
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isRecurring: false,
    },
    title: dto.title,
    location: dto.location,
    price: dto.price,
  };
}

function resolveMeetupStatus(status: string): EventStatus {
  const upper = status.toUpperCase();
  if (upper === 'ONGOING') return EventStatus.ONGOING;
  if (upper === 'CLOSED') return EventStatus.ENDED;
  return EventStatus.UPCOMING;
}

/** 개인 행사(모임) 목록 API DTO → 프론트엔드 Event 변환 */
export function mapMeetupDtoToEvent(dto: MeetupItemDTO): PersonalEvent {
  const scheduledDate = new Date(dto.scheduledAt);
  const hours = String(scheduledDate.getHours()).padStart(2, '0');
  const minutes = String(scheduledDate.getMinutes()).padStart(2, '0');
  return {
    id: String(dto.meetupId),
    imageUrl: dto.thumbnailUrl ?? '',
    status: resolveMeetupStatus(dto.status),
    source: EventSource.PERSONAL,
    dateInfo: {
      startDate: scheduledDate,
      endDate: scheduledDate,
      startTime: `${hours}:${minutes}`,
      isRecurring: false,
    },
    title: dto.title,
    location: dto.location,
    currentMembers: dto.currentMembers,
    maxMembers: dto.maxMembers,
  };
}
