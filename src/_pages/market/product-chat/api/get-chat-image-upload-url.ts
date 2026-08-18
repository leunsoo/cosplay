import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';

// Request 스키마
export const UploadChatImageBodySchema = z.object({
  filename: z.string(),
});
export type UploadChatImageBody = z.infer<typeof UploadChatImageBodySchema>;

// Response 스키마
export const UploadChatImageDTOSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});
export type UploadChatImageDTO = z.infer<typeof UploadChatImageDTOSchema>;

/**
 * 채팅 이미지 업로드용 Pre-signed URL 발급 API
 * @param body - 요청 본문 (filename)
 * @returns uploadUrl (S3 PUT 업로드용), imageUrl (메시지 전송용)
 */
export const getChatImageUploadUrl = async (
  body: UploadChatImageBody
): Promise<ApiResponse<UploadChatImageDTO>> => {
  const validatedBody = UploadChatImageBodySchema.parse(body);

  return apiClient.postWithValidation(
    '/api/v1/chat/messages/image-upload-url',
    UploadChatImageDTOSchema,
    validatedBody
  );
};
