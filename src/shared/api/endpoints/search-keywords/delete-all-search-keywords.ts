import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { clearDemoSearchKeywords } from '@/mocks';

// 검색 키워드 전체 삭제 API

export const DeleteAllSearchKeywordsParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type DeleteAllSearchKeywordsParams = z.infer<
  typeof DeleteAllSearchKeywordsParamsSchema
>;

export const DeleteAllSearchKeywordsDTOSchema = z.object({
  message: z.string(),
});
export type DeleteAllSearchKeywordsDTO = z.infer<
  typeof DeleteAllSearchKeywordsDTOSchema
>;

export const deleteAllSearchKeywords = async (
  params: DeleteAllSearchKeywordsParams
): Promise<ApiResponse<DeleteAllSearchKeywordsDTO>> => {
  const validatedParams = DeleteAllSearchKeywordsParamsSchema.parse(params);

  if (IS_DEMO) {
    clearDemoSearchKeywords();
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { message: '전체 삭제되었습니다.' },
    };
  }

  return apiClient.deleteWithValidation(
    '/api/v1/search-keywords',
    DeleteAllSearchKeywordsDTOSchema,
    {
      params: validatedParams,
    }
  );
};
