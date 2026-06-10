import { z } from 'zod';

// 이미지 업로드 Pre-signed URL 발급 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const UploadProductImagesBodySchema = z.object({
  imageType: z.enum(['main', 'detail']),
  imageCount: z.number().int().positive(),
});

// ------------------ Response 스키마 (외부에서 사용)
const UploadUrlItemSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});

export const UploadProductImagesDTOSchema = z.object({
  uploadUrls: z.array(UploadUrlItemSchema),
});

// ------------------ 타입 추론
export type UploadProductImagesBody = z.infer<
  typeof UploadProductImagesBodySchema
>;
export type UploadProductImagesDTO = z.infer<
  typeof UploadProductImagesDTOSchema
>;
