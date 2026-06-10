import { z } from 'zod';

// 상품 수정 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const UpdateProductParamsSchema = z.object({
  uuid: z.string(),
  productId: z.number().int().positive(),
});

export const UpdateProductBodySchema = z.object({
  title: z.string().min(1).max(20),
  price: z.number().nonnegative(),
  description: z.string(),
  priceNegotiable: z.boolean(),
  shippingType: z.enum(['separate', 'included']),
  standardShipping: z.number().nonnegative(),
  directTradeEnabled: z.enum(['possible', 'impossible']),
  directTradeLocation: z.string(),
  directTradePlace: z.string(),
  mainImageUrl: z.string(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const UpdateProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  status: z.string(),
  updatedAt: z.string(),
});

// ------------------ 타입 추론
export type UpdateProductParams = z.infer<typeof UpdateProductParamsSchema>;
export type UpdateProductBody = z.infer<typeof UpdateProductBodySchema>;
export type UpdateProductDTO = z.infer<typeof UpdateProductDTOSchema>;
