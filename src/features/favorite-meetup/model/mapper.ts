import type { FavoriteMeetupListDTO } from '@/shared/api/endpoints/favorite-meetup';
import {
  EventSource,
  parseEventStatus,
  type PersonalEvent,
} from '@/entities/event';

export interface BookmarkedMeetup {
  id: string;
  title: string;
  month: string;
  day: string;
  status?: string;
}

function resolveMeetupStatus(scheduledAt: Date): string {
  const now = new Date();
  const endOfDay = new Date(scheduledAt);
  endOfDay.setHours(23, 59, 59, 999);

  if (now > endOfDay) return '종료됨';
  return '진행중';
}

export function mapFavoriteMeetupToBookmarkedMeetup(
  dto: FavoriteMeetupListDTO['meetups'][number]
): BookmarkedMeetup {
  const scheduledAt = new Date(dto.scheduledAt);

  return {
    id: String(dto.meetupId),
    title: dto.title,
    month: `${scheduledAt.getMonth() + 1}월`,
    day: String(scheduledAt.getDate()).padStart(2, '0'),
    status: resolveMeetupStatus(scheduledAt),
  };
}

export function mapFavoriteMeetupToPersonalEvent(
  dto: FavoriteMeetupListDTO['meetups'][number]
): PersonalEvent {
  const scheduledDate = new Date(dto.scheduledAt);
  const hours = String(scheduledDate.getHours()).padStart(2, '0');
  const minutes = String(scheduledDate.getMinutes()).padStart(2, '0');
  return {
    id: String(dto.meetupId),
    title: dto.title,
    imageUrl: dto.thumbnailUrl,
    location: dto.location,
    maxMembers: dto.maxMembers,
    currentMembers: dto.currentMembers,
    status: parseEventStatus(dto.status),
    source: EventSource.PERSONAL,
    dateInfo: {
      startDate: scheduledDate,
      endDate: scheduledDate,
      startTime: `${hours}:${minutes}`,
      isRecurring: false,
    },
  };
}
