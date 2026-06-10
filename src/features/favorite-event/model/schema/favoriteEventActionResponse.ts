import { z } from 'zod';

// 행사 찜하기/찜하기 취소 공통 응답 스키마

// ------------------ Response 스키마 (외부에서 사용)
export const FavoriteEventActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});

// ------------------ 타입 추론
export type FavoriteEventActionResponse = z.infer<
  typeof FavoriteEventActionResponseSchema
>;
