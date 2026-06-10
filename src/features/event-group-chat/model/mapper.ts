import { type EventChatMessageDTO } from './schema';
import { type EventChatMessage } from './types';

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
