import { type MeetupChatMessageDTO } from './schema';
import { type MeetupChatMessage } from './types';

export function mapMeetupChatMessageDTOToMessage(
  dto: MeetupChatMessageDTO,
  myUuid: string
): MeetupChatMessage {
  return {
    id: dto.id,
    roomId: dto.roomId,
    meetupId: dto.meetupId,
    senderUuid: dto.senderUuid,
    senderNickname: dto.senderNickname,
    senderProfileImageUri: dto.senderProfileImageUri ?? null,
    content: dto.content,
    type: dto.type,
    createdAt: dto.createdAt,
    isMyMessage: dto.senderUuid === myUuid,
  };
}

export function mapMeetupChatMessageDTOsToMessages(
  dtos: MeetupChatMessageDTO[],
  myUuid: string
): MeetupChatMessage[] {
  return dtos.map((dto) => mapMeetupChatMessageDTOToMessage(dto, myUuid));
}
