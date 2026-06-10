import { z } from 'zod';

// 행사 찜 상태 확인 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const GetFavoriteEventStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  eventId: z.number().int().positive(),
});

// ------------------ Response 스키마 (외부에서 사용)
export const FavoriteEventStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});

// ------------------ 타입 추론
export type GetFavoriteEventStatusParams = z.infer<
  typeof GetFavoriteEventStatusParamsSchema
>;
export type FavoriteEventStatusDTO = z.infer<
  typeof FavoriteEventStatusDTOSchema
>;
