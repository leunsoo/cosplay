import { z } from 'zod';

// Request 스키마
export const UploadChatImageBodySchema = z.object({
  filename: z.string(),
});

// Response 스키마
export const UploadChatImageDTOSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});

// 타입 추론
export type UploadChatImageBody = z.infer<typeof UploadChatImageBodySchema>;
export type UploadChatImageDTO = z.infer<typeof UploadChatImageDTOSchema>;
