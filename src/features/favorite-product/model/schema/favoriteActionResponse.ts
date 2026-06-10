import { z } from 'zod';

// 찜하기/찜하기 취소 공통 응답 스키마

export const FavoriteActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});

export type FavoriteActionResponse = z.infer<
  typeof FavoriteActionResponseSchema
>;
