import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoChatRoom } from '@/mocks';

// Request 스키마
export const CreateChatRoomBodySchema = z.object({
  productId: z.number().int().positive(),
  buyerUuid: z.string().min(1),
  sellerUuid: z.string().min(1),
});
export type CreateChatRoomBody = z.infer<typeof CreateChatRoomBodySchema>;

// Response 스키마
export const CreateChatRoomDTOSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  buyerUuid: z.string(),
  sellerUuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type CreateChatRoomDTO = z.infer<typeof CreateChatRoomDTOSchema>;

/**
 * 채팅방 생성 API
 * @param body - 요청 본문 (productId, buyerUuid, sellerUuid)
 * @returns 생성된 채팅방 정보 (Zod로 검증됨)
 */
export const createChatRoom = async (
  body: CreateChatRoomBody
): Promise<ApiResponse<CreateChatRoomDTO>> => {
  const validatedBody = CreateChatRoomBodySchema.parse(body);

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: createDemoChatRoom(validatedBody),
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/chat/rooms',
    CreateChatRoomDTOSchema,
    validatedBody
  );
};
