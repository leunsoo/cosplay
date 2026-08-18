import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockChatRoomDetails } from '@/mocks';

// Request 스키마
export const GetChatRoomParamsSchema = z.object({
  roomId: z.number().int().nonnegative(),
  userUuid: z.string().min(1),
});
export type GetChatRoomParams = z.infer<typeof GetChatRoomParamsSchema>;

// Response 스키마
export const ChatRoomDetailDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  opponentNickname: z.string(),
  opponentProfileImageUri: z.string().nullable(),
  opponentUuid: z.string(),
  productId: z.number().int().nonnegative(),
  productPhotoUrl: z.string(),
  productTitle: z.string(),
  productPrice: z.number().optional(),
  productStatus: z.string(),
});
export type ChatRoomDetailDTO = z.infer<typeof ChatRoomDetailDTOSchema>;

/**
 * 채팅방 단건 조회 API
 * @param params - 경로 파라미터 (roomId) 및 쿼리 파라미터 (userUuid)
 * @returns 채팅방 상세 정보 (Zod로 검증됨)
 */
export const getChatRoom = async (
  params: GetChatRoomParams
): Promise<ApiResponse<ChatRoomDetailDTO>> => {
  const validatedParams = GetChatRoomParamsSchema.parse(params);

  if (IS_DEMO) {
    const detail =
      mockChatRoomDetails[validatedParams.roomId] ?? mockChatRoomDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }

  return apiClient.getWithValidation(
    `/api/v1/chat/rooms/${validatedParams.roomId}`,
    ChatRoomDetailDTOSchema,
    { params: { userUuid: validatedParams.userUuid } }
  );
};
