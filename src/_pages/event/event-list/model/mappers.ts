import type { MeetupItemDTO } from '@/shared/api/meetup';
import { type PersonalEvent, EventStatus, EventSource } from '@/entities/event';

function resolveMeetupStatus(status: string): EventStatus {
  const upper = status.toUpperCase();
  if (upper === 'ONGOING') return EventStatus.ONGOING;
  if (upper === 'CLOSED') return EventStatus.ENDED;
  return EventStatus.UPCOMING;
}

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
