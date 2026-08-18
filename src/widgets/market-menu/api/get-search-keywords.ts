import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoSearchKeywords } from '@/mocks';

// 최근 검색 키워드 조회 API

const SearchKeywordDTOSchema = z.object({
  id: z.number().int().positive(),
  keyword: z.string().min(1),
  searchedAt: z.string(),
});

export const GetSearchKeywordsParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type GetSearchKeywordsParams = z.infer<
  typeof GetSearchKeywordsParamsSchema
>;

export const SearchKeywordsDTOSchema = z.object({
  keywords: z.array(SearchKeywordDTOSchema),
});
export type SearchKeywordsDTO = z.infer<typeof SearchKeywordsDTOSchema>;

export const getSearchKeywords = async (
  params: GetSearchKeywordsParams
): Promise<ApiResponse<SearchKeywordsDTO>> => {
  const validatedParams = GetSearchKeywordsParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoSearchKeywords(),
    };

  return apiClient.getWithValidation(
    '/api/v1/search-keywords',
    SearchKeywordsDTOSchema,
    {
      params: validatedParams,
    }
  );
};
