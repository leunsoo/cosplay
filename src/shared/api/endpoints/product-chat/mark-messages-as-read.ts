import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { markDemoMessagesAsRead } from '@/mocks';

// Request 스키마
export const MarkMessagesAsReadBodySchema = z.object({
  roomId: z.number().int().nonnegative(),
  readerUuid: z.string().uuid(),
});
export type MarkMessagesAsReadBody = z.infer<
  typeof MarkMessagesAsReadBodySchema
>;

// Response 스키마
export const MarkMessagesAsReadDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  readerUuid: z.string().uuid(),
  updatedCount: z.number().int().nonnegative(),
});
export type MarkMessagesAsReadDTO = z.infer<typeof MarkMessagesAsReadDTOSchema>;

/**
 * 채팅 메시지 읽음 처리 API
 * @param body - 요청 본문 (roomId, readerUuid)
 * @returns 읽음 처리 결과 (Zod로 검증됨)
 */
export const markMessagesAsRead = async (
  body: MarkMessagesAsReadBody
): Promise<ApiResponse<MarkMessagesAsReadDTO>> => {
  const validatedBody = MarkMessagesAsReadBodySchema.parse(body);

  if (IS_DEMO) {
    const updatedCount = markDemoMessagesAsRead(validatedBody.roomId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { ...validatedBody, updatedCount },
    };
  }

  return apiClient.patchWithValidation(
    '/api/v1/chat/messages/read',
    MarkMessagesAsReadDTOSchema,
    validatedBody
  );
};
