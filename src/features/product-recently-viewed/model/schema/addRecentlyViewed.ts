import { z } from 'zod';

// 상품 기록 추가 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const AddRecentlyViewedBodySchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});

// ------------------ 타입 추론
export type AddRecentlyViewedBody = z.infer<typeof AddRecentlyViewedBodySchema>;
