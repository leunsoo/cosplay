import { z } from 'zod';

// 검색 키워드 전체 삭제 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteAllSearchKeywordsParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const DeleteAllSearchKeywordsDTOSchema = z.object({
  message: z.string(),
});

// ------------------ 타입 추론
export type DeleteAllSearchKeywordsParams = z.infer<
  typeof DeleteAllSearchKeywordsParamsSchema
>;
export type DeleteAllSearchKeywordsDTO = z.infer<
  typeof DeleteAllSearchKeywordsDTOSchema
>;
