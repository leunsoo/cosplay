import { z } from 'zod';

// 행사 찜하기 취소 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteFavoriteEventParamsSchema = z.object({
  uuid: z.string().min(1),
  eventId: z.number().int().positive(),
});

// ------------------ 타입 추론
export type DeleteFavoriteEventParams = z.infer<
  typeof DeleteFavoriteEventParamsSchema
>;
