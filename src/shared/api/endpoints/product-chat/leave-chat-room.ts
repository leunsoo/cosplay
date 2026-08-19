import { z } from 'zod';
import { apiClient } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { leaveDemoChatRoom } from '@/mocks';

// Request 스키마
export const LeaveChatRoomParamsSchema = z.object({
  roomId: z.number().int().positive(),
});
export type LeaveChatRoomParams = z.infer<typeof LeaveChatRoomParamsSchema>;

export const LeaveChatRoomBodySchema = z.object({
  userUuid: z.string().min(1),
});
export type LeaveChatRoomBody = z.infer<typeof LeaveChatRoomBodySchema>;

/**
 * 채팅방 나가기 API
 * @param params - 경로 파라미터 (roomId)
 * @param body - 요청 본문 (userUuid)
 */
export const leaveChatRoom = async (
  params: LeaveChatRoomParams,
  body: LeaveChatRoomBody
): Promise<void> => {
  const validatedParams = LeaveChatRoomParamsSchema.parse(params);
  const validatedBody = LeaveChatRoomBodySchema.parse(body);

  if (IS_DEMO) {
    leaveDemoChatRoom(validatedParams.roomId);
    return;
  }

  await apiClient.post(
    `/api/v1/chat/rooms/${validatedParams.roomId}/leave`,
    validatedBody
  );
};
