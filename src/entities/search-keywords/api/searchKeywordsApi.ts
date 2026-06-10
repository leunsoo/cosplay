import { apiClient, type ApiResponse } from '@/shared/api';
import {
  GetSearchKeywordsParamsSchema,
  SearchKeywordsDTOSchema,
  type GetSearchKeywordsParams,
  type SearchKeywordsDTO,
  DeleteAllSearchKeywordsParamsSchema,
  DeleteAllSearchKeywordsDTOSchema,
  type DeleteAllSearchKeywordsParams,
  type DeleteAllSearchKeywordsDTO,
  DeleteSearchKeywordParamsSchema,
  DeleteSearchKeywordDTOSchema,
  type DeleteSearchKeywordParams,
  type DeleteSearchKeywordDTO,
} from '../model';

/**
 * 최근 검색 키워드 조회 API
 *
 * @param params - uuid (사용자 UUID)
 * @returns 최근 검색 키워드 목록
 *
 * @example
 * ```ts
 * const response = await getSearchKeywords({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getSearchKeywords = async (
  params: GetSearchKeywordsParams
): Promise<ApiResponse<SearchKeywordsDTO>> => {
  // 1. 요청 파라미터 검증
  const validatedParams = GetSearchKeywordsParamsSchema.parse(params);

  // 2. API 호출 및 응답 검증
  return apiClient.getWithValidation(
    '/api/v1/search-keywords',
    SearchKeywordsDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 검색 키워드 전체 삭제 API
 *
 * @param params - uuid (사용자 UUID)
 * @returns 삭제 결과 메시지
 *
 * @example
 * ```ts
 * const response = await deleteAllSearchKeywords({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const deleteAllSearchKeywords = async (
  params: DeleteAllSearchKeywordsParams
): Promise<ApiResponse<DeleteAllSearchKeywordsDTO>> => {
  // 1. 요청 파라미터 검증
  const validatedParams = DeleteAllSearchKeywordsParamsSchema.parse(params);

  // 2. API 호출 및 응답 검증
  return apiClient.deleteWithValidation(
    '/api/v1/search-keywords',
    DeleteAllSearchKeywordsDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 검색 키워드 단건 삭제 API
 *
 * @param params - keywordId (키워드 ID), uuid (사용자 UUID)
 * @returns 삭제 결과 메시지 및 삭제된 키워드 ID
 *
 * @example
 * ```ts
 * const response = await deleteSearchKeyword({ keywordId: 10, uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const deleteSearchKeyword = async (
  params: DeleteSearchKeywordParams
): Promise<ApiResponse<DeleteSearchKeywordDTO>> => {
  // 1. 요청 파라미터 검증
  const validatedParams = DeleteSearchKeywordParamsSchema.parse(params);

  // 2. API 호출 및 응답 검증 (path parameter interpolation)
  return apiClient.deleteWithValidation(
    `/api/v1/search-keywords/${validatedParams.keywordId}`,
    DeleteSearchKeywordDTOSchema,
    {
      params: { uuid: validatedParams.uuid },
    }
  );
};
