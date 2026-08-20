import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { resolveDemoChatRoom } from '@/mocks';

// Request 스키마
export const ResolveChatRoomParamsSchema = z.object({
  productId: z.number().int().positive(),
  buyerUuid: z.string().min(1),
  sellerUuid: z.string().min(1),
});
export type ResolveChatRoomParams = z.infer<typeof ResolveChatRoomParamsSchema>;

// Response 스키마
export const ResolveChatRoomDTOSchema = z.object({
  exists: z.boolean(),
  roomId: z.number().int().nonnegative().nullable(),
});
export type ResolveChatRoomDTO = z.infer<typeof ResolveChatRoomDTOSchema>;

/**
 * 채팅방 존재 여부 확인 API
 * @param params - 쿼리 파라미터 (productId, buyerUuid, sellerUuid)
 * @returns 채팅방 존재 여부 및 roomId (Zod로 검증됨)
 */
export const resolveChatRoom = async (
  params: ResolveChatRoomParams
): Promise<ApiResponse<ResolveChatRoomDTO>> => {
  const validatedParams = ResolveChatRoomParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: resolveDemoChatRoom(validatedParams.productId),
    };

  return apiClient.getWithValidation(
    '/api/v1/chat/rooms/resolve',
    ResolveChatRoomDTOSchema,
    { params: validatedParams }
  );
};
