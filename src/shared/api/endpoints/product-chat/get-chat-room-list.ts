import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockChatRoomList } from '@/mocks';

// Request 스키마
export const GetChatRoomListParamsSchema = z.object({
  userUuid: z.string().min(1),
});
export type GetChatRoomListParams = z.infer<typeof GetChatRoomListParamsSchema>;

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
export type ChatRoomDTO = z.infer<typeof ChatRoomDTOSchema>;

export const ChatRoomListDTOSchema = z.array(ChatRoomDTOSchema);
export type ChatRoomListDTO = z.infer<typeof ChatRoomListDTOSchema>;

/**
 * 채팅방 목록 조회 API
 * @param params - 쿼리 파라미터 (userUuid)
 * @returns 채팅방 목록 (Zod로 검증됨)
 */
export const getChatRoomList = async (
  params: GetChatRoomListParams
): Promise<ApiResponse<ChatRoomListDTO>> => {
  const validatedParams = GetChatRoomListParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockChatRoomList };

  return apiClient.getWithValidation(
    '/api/v1/chat/rooms',
    ChatRoomListDTOSchema,
    { params: validatedParams }
  );
};
