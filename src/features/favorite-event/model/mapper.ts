import type { FavoriteEventListDTO } from './schema/getFavoriteEventList';
import { EventStatus, EventSource, type OfficialEvent } from '@/entities/event';

export interface BookmarkedEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  status?: string;
  isUpcoming?: boolean;
}

const statusMap: Record<string, EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

function resolveEventStatus(startDate: Date, endDate: Date): string {
  const now = new Date();
  if (now < startDate) return '예정';
  if (now > endDate) return '종료됨';
  return '진행중';
}

export function mapFavoriteEventToBookmarkedEvent(
  dto: FavoriteEventListDTO['events'][number]
): BookmarkedEvent {
  const startDate = new Date(dto.startDate);
  const endDate = new Date(dto.endDate);
  const now = new Date();

  return {
    id: String(dto.eventId),
    title: dto.title,
    month: `${startDate.getMonth() + 1}월`,
    day: String(startDate.getDate()).padStart(2, '0'),
    status: resolveEventStatus(startDate, endDate),
    isUpcoming: startDate > now,
  };
}

export function mapFavoriteEventToOfficialEvent(
  dto: FavoriteEventListDTO['events'][number]
): OfficialEvent {
  return {
    id: String(dto.eventId),
    title: dto.title,
    imageUrl: dto.thumbnailUrl,
    location: dto.location,
    price: dto.price,
    category: dto.category,
    status: statusMap[dto.status] ?? EventStatus.UPCOMING,
    source: EventSource.OFFICIAL,
    dateInfo: {
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isRecurring: false,
    },
  };
}
