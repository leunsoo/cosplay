import { z } from 'zod';

// 상품 상태 변경 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const UpdateProductStatusParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});

export const UpdateProductStatusBodySchema = z.object({
  status: z.enum(['SELLING', 'RESERVED', 'SOLD']),
});

// ------------------ Response 스키마 (외부에서 사용)
export const UpdateProductStatusDTOSchema = z.object({
  productId: z.number().int().positive(),
  status: z.string(),
  updatedAt: z.string(),
});

// ------------------ 타입 추론
export type UpdateProductStatusParams = z.infer<
  typeof UpdateProductStatusParamsSchema
>;
export type UpdateProductStatusBody = z.infer<
  typeof UpdateProductStatusBodySchema
>;
export type UpdateProductStatusDTO = z.infer<
  typeof UpdateProductStatusDTOSchema
>;
