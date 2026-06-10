import { z } from 'zod';

// 최근 검색 키워드 조회 API 스키마

// ------------------ Internal 스키마 (파일 내부에서만 사용)
const SearchKeywordDTOSchema = z.object({
  id: z.number().int().positive(),
  keyword: z.string().min(1),
  searchedAt: z.string(),
});

// ------------------ Request 스키마 (외부에서 사용)
export const GetSearchKeywordsParamsSchema = z.object({
  uuid: z.string().min(1),
});

// ------------------ Response 스키마 (외부에서 사용)
export const SearchKeywordsDTOSchema = z.object({
  keywords: z.array(SearchKeywordDTOSchema),
});

// ------------------ 타입 추론
export type GetSearchKeywordsParams = z.infer<
  typeof GetSearchKeywordsParamsSchema
>;
export type SearchKeywordsDTO = z.infer<typeof SearchKeywordsDTOSchema>;
