import type { EventDetailDTO } from '@/shared/api/endpoints/event';
import type { EventChatMessageDTO } from '@/shared/api/endpoints/event-chat';
import { EventStatus, EventSource } from '@/entities/event';
import type { OfficialEventDetail } from './event';
import type { EventChatMessage } from './event-chat';

const statusMap: Record<'UPCOMING' | 'ONGOING' | 'CLOSED', EventStatus> = {
  UPCOMING: EventStatus.UPCOMING,
  ONGOING: EventStatus.ONGOING,
  CLOSED: EventStatus.ENDED,
};

export interface EventDetailWithUploader {
  event: OfficialEventDetail;
  recommended: boolean;
}

export function mapEventDetailDtoToEventDetailWithUploader(
  dto: EventDetailDTO
): EventDetailWithUploader {
  const event: OfficialEventDetail = {
    id: String(dto.eventId),
    imageUrl: dto.thumbnailUrl,
    category: dto.category,
    dateInfo: {
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isRecurring: false,
    },
    title: dto.title,
    location: dto.location,
    address: dto.locationDetail ?? undefined,
    status: statusMap[dto.status],
    source: EventSource.OFFICIAL,
    price: dto.price,
    description: dto.description ?? undefined,
    schedules: dto.schedules ?? undefined,
  };

  return {
    event,
    recommended: dto.recommended,
  };
}

export function mapEventChatMessageDTOToMessage(
  dto: EventChatMessageDTO,
  myUuid: string
): EventChatMessage {
  return {
    id: dto.id,
    roomId: dto.roomId,
    eventId: dto.eventId,
    senderUuid: dto.senderUuid,
    senderNickname: dto.senderNickname,
    senderProfileImageUri: dto.senderProfileImageUri ?? null,
    content: dto.content,
    type: dto.type,
    createdAt: dto.createdAt,
    isMyMessage: dto.senderUuid === myUuid,
  };
}

export function mapEventChatMessageDTOsToMessages(
  dtos: EventChatMessageDTO[],
  myUuid: string
): EventChatMessage[] {
  return dtos.map((dto) => mapEventChatMessageDTOToMessage(dto, myUuid));
}
