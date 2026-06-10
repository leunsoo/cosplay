import { z } from 'zod';

// 상품 삭제 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteProductParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const DeleteProductDTOSchema = z.object({
  productId: z.number().int().positive(),
  status: z.string(),
});

// ------------------ 타입 추론
export type DeleteProductParams = z.infer<typeof DeleteProductParamsSchema>;
export type DeleteProductDTO = z.infer<typeof DeleteProductDTOSchema>;
