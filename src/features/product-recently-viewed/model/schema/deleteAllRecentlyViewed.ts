import { z } from 'zod';

// 최근 본 상품 기록 전체 삭제 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteAllRecentlyViewedParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const DeleteAllRecentlyViewedDTOSchema = z.object({
  deletedCount: z.number(),
});

// ------------------ 타입 추론
export type DeleteAllRecentlyViewedParams = z.infer<
  typeof DeleteAllRecentlyViewedParamsSchema
>;
export type DeleteAllRecentlyViewedDTO = z.infer<
  typeof DeleteAllRecentlyViewedDTOSchema
>;
