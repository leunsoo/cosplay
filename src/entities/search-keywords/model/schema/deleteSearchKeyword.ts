import { z } from 'zod';

// 검색 키워드 단건 삭제 API 스키마

// ------------------ Request 스키마 (외부에서 사용)
export const DeleteSearchKeywordParamsSchema = z.object({
  keywordId: z.number().int().positive(),
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const DeleteSearchKeywordDTOSchema = z.object({
  message: z.string(),
  deletedKeywordId: z.number().int().positive(),
});

// ------------------ 타입 추론
export type DeleteSearchKeywordParams = z.infer<
  typeof DeleteSearchKeywordParamsSchema
>;
export type DeleteSearchKeywordDTO = z.infer<
  typeof DeleteSearchKeywordDTOSchema
>;
