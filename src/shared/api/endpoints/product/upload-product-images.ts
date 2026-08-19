import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';

// 이미지 업로드 Pre-signed URL 발급 API

export const UploadProductImagesBodySchema = z.object({
  imageType: z.enum(['main', 'detail']),
  imageCount: z.number().int().positive(),
});
export type UploadProductImagesBody = z.infer<
  typeof UploadProductImagesBodySchema
>;

const UploadUrlItemSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});

export const UploadProductImagesDTOSchema = z.object({
  uploadUrls: z.array(UploadUrlItemSchema),
});
export type UploadProductImagesDTO = z.infer<
  typeof UploadProductImagesDTOSchema
>;

export const uploadProductImages = async (
  body: UploadProductImagesBody
): Promise<ApiResponse<UploadProductImagesDTO>> => {
  const validatedBody = UploadProductImagesBodySchema.parse(body);

  return apiClient.postWithValidation(
    '/api/v1/products/upload-urls',
    UploadProductImagesDTOSchema,
    validatedBody
  );
};
