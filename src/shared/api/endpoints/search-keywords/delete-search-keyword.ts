import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { removeDemoSearchKeyword } from '@/mocks';

// 검색 키워드 단건 삭제 API

export const DeleteSearchKeywordParamsSchema = z.object({
  keywordId: z.number().int().positive(),
  uuid: z.string().min(1),
});
export type DeleteSearchKeywordParams = z.infer<
  typeof DeleteSearchKeywordParamsSchema
>;

export const DeleteSearchKeywordDTOSchema = z.object({
  message: z.string(),
  deletedKeywordId: z.number().int().positive(),
});
export type DeleteSearchKeywordDTO = z.infer<
  typeof DeleteSearchKeywordDTOSchema
>;

export const deleteSearchKeyword = async (
  params: DeleteSearchKeywordParams
): Promise<ApiResponse<DeleteSearchKeywordDTO>> => {
  const validatedParams = DeleteSearchKeywordParamsSchema.parse(params);

  if (IS_DEMO) {
    removeDemoSearchKeyword(validatedParams.keywordId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        message: '삭제되었습니다.',
        deletedKeywordId: validatedParams.keywordId,
      },
    };
  }

  return apiClient.deleteWithValidation(
    `/api/v1/search-keywords/${validatedParams.keywordId}`,
    DeleteSearchKeywordDTOSchema,
    {
      params: { uuid: validatedParams.uuid },
    }
  );
};
