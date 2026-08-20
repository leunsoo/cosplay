import type {
  ChatRoomDTO,
  MessageDTO,
} from '@/shared/api/endpoints/product-chat';
import type { ChatRoom, Message } from './chat';

/**
 * ChatRoomDTO를 ChatRoom 타입으로 변환
 */
export function transformChatRoomDTO(dto: ChatRoomDTO): ChatRoom {
  return {
    id: String(dto.roomId),
    userName: dto.opponentNickname,
    userAvatar: dto.opponentProfileImageUri ?? '',
    productTitle: dto.productTitle,
    lastMessage: dto.lastMessage,
    lastMessageType: dto.lastMessageType,
    thumbnailImage: dto.productPhotoUrl,
    unreadCount: dto.unreadCount,
    isActive: false,
  };
}

/**
 * ChatRoomDTO 배열을 ChatRoom 배열로 변환
 */
export function transformChatRoomList(dtoList: ChatRoomDTO[]): ChatRoom[] {
  return dtoList.map(transformChatRoomDTO);
}

/**
 * MessageDTO를 Message 타입으로 변환
 * @param dto - HTTP API 응답의 메시지 DTO
 * @param userUuid - 현재 로그인 유저의 UUID (sender/receiver 판별용)
 */
export function mapMessageDTOToMessage(
  dto: MessageDTO,
  userUuid: string
): Message {
  const isSender = dto.senderUuid === userUuid;
  const isImage = dto.type === 'IMAGE';
  return {
    id: String(dto.id),
    type: isSender ? 'sender' : 'receiver',
    message: isImage ? undefined : dto.message,
    imageUrl: isImage ? dto.message : undefined,
    timestamp: dto.createdAt,
  };
}

/**
 * MessageDTO 배열을 Message 배열로 변환
 */
export function mapMessageDTOsToMessages(
  dtos: MessageDTO[],
  userUuid: string
): Message[] {
  return dtos.map((dto) => mapMessageDTOToMessage(dto, userUuid));
}
