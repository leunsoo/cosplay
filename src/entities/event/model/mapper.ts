import type { EventDTO } from './schema/getEventList';
import type { OfficialEvent } from '../types';
import { EventStatus, EventSource } from '../types';

const statusMap: Record<'UPCOMING' | 'ONGOING' | 'CLOSED', EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

/** API DTO → 프론트엔드 Event 변환 */
export function mapEventDtoToEvent(dto: EventDTO): OfficialEvent {
  return {
    id: String(dto.eventId),
    imageUrl: dto.thumbnailUrl,
    category: dto.category,
    status: statusMap[dto.status],
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

/** API DTO 배열 → Event 배열 변환 */
export function mapEventDtosToEvents(dtos: EventDTO[]): OfficialEvent[] {
  return dtos.map(mapEventDtoToEvent);
}
