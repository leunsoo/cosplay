import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockChatMessages } from '@/mocks';

// Request 스키마
export const GetChatMessagesParamsSchema = z.object({
  roomId: z.number().int().positive(),
  userUuid: z.string(),
  before: z.number().int().positive().optional(),
});
export type GetChatMessagesParams = z.infer<typeof GetChatMessagesParamsSchema>;

// Response 스키마
export const MessageDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  senderUuid: z.string(),
  message: z.string(),
  type: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});
export type MessageDTO = z.infer<typeof MessageDTOSchema>;

export const MessageListDTOSchema = z.array(MessageDTOSchema);
export type MessageListDTO = z.infer<typeof MessageListDTOSchema>;

/**
 * 채팅방 메시지 목록 조회 API
 * @param params - 경로 파라미터 (roomId), 쿼리 파라미터 (userUuid, before)
 * @returns 메시지 목록 최신 50개 시간순 (Zod로 검증됨)
 */
export const getChatMessages = async (
  params: GetChatMessagesParams
): Promise<ApiResponse<MessageListDTO>> => {
  const { roomId, ...queryParams } = GetChatMessagesParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: mockChatMessages[roomId] ?? [],
    };

  return apiClient.getWithValidation(
    `/api/v1/chat/messages/room/${roomId}`,
    MessageListDTOSchema,
    { params: queryParams }
  );
};
