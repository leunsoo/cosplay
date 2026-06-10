import { z } from 'zod';

// Request 스키마
export const GetChatRoomListParamsSchema = z.object({
  userUuid: z.string().min(1),
});

// Response 스키마
export const ChatRoomDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  opponentNickname: z.string(),
  opponentProfileImageUri: z.string().nullable(),
  productPhotoUrl: z.string(),
  productTitle: z.string(),
  lastMessage: z.string().nullable(),
  lastMessageType: z.enum(['IMAGE', 'TEXT']).nullable(),
  unreadCount: z.number().int().nonnegative(),
});

export const ChatRoomListDTOSchema = z.array(ChatRoomDTOSchema);

// 타입 추론
export type GetChatRoomListParams = z.infer<typeof GetChatRoomListParamsSchema>;
export type ChatRoomDTO = z.infer<typeof ChatRoomDTOSchema>;
export type ChatRoomListDTO = z.infer<typeof ChatRoomListDTOSchema>;
