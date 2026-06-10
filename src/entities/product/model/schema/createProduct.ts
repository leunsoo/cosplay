import { z } from 'zod';

// 상품 등록 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const CreateProductParamsSchema = z.object({
  uuid: z.string(),
});

export const CreateProductBodySchema = z.object({
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
export const CreateProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  status: z.string(),
  createdAt: z.string(),
});

// ------------------ 타입 추론
export type CreateProductParams = z.infer<typeof CreateProductParamsSchema>;
export type CreateProductBody = z.infer<typeof CreateProductBodySchema>;
export type CreateProductDTO = z.infer<typeof CreateProductDTOSchema>;
