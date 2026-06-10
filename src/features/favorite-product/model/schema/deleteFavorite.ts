import { z } from 'zod';

// 찜하기 취소 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteFavoriteParamsSchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});

// ------------------ 타입 추론
export type DeleteFavoriteParams = z.infer<typeof DeleteFavoriteParamsSchema>;
