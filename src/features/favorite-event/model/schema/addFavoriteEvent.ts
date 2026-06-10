import { z } from 'zod';

// 행사 찜하기 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const AddFavoriteEventParamsSchema = z.object({
  uuid: z.string().min(1),
});

export const AddFavoriteEventBodySchema = z.object({
  eventId: z.number().int().positive(),
});

// ------------------ 타입 추론
export type AddFavoriteEventParams = z.infer<
  typeof AddFavoriteEventParamsSchema
>;
export type AddFavoriteEventBody = z.infer<typeof AddFavoriteEventBodySchema>;
