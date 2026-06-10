import { z } from 'zod';

// 찜 상태 조회 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const GetFavoriteStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const FavoriteStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});

// ------------------ 타입 추론
export type GetFavoriteStatusParams = z.infer<
  typeof GetFavoriteStatusParamsSchema
>;
export type FavoriteStatusDTO = z.infer<typeof FavoriteStatusDTOSchema>;
