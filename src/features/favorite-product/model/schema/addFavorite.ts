import { z } from 'zod';

// 상품 찜하기 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const AddFavoriteParamsSchema = z.object({
  uuid: z.string().min(1),
});

export const AddFavoriteBodySchema = z.object({
  productId: z.string().min(1),
});

// ------------------ 타입 추론
export type AddFavoriteParams = z.infer<typeof AddFavoriteParamsSchema>;
export type AddFavoriteBody = z.infer<typeof AddFavoriteBodySchema>;
