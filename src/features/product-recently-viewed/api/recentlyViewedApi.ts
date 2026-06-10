import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import {
  RecentlyViewedListDTOSchema,
  GetRecentlyViewedListParamsSchema,
  type GetRecentlyViewedListParams,
  type RecentlyViewedListDTO,
  AddRecentlyViewedBodySchema,
  type AddRecentlyViewedBody,
  DeleteAllRecentlyViewedParamsSchema,
  DeleteAllRecentlyViewedDTOSchema,
  type DeleteAllRecentlyViewedParams,
  type DeleteAllRecentlyViewedDTO,
} from '../model';

/**
 * 최근 본 상품 목록 조회 API
 *
 * @param params - uuid (쿼리 파라미터)
 * @returns 최근 본 상품 목록 및 총 개수
 *
 * @example
 * ```ts
 * const response = await getRecentlyViewedList({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getRecentlyViewedList = async (
  params: GetRecentlyViewedListParams
): Promise<ApiResponse<RecentlyViewedListDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetRecentlyViewedListParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.getWithValidation(
    '/api/v1/recently-viewed',
    RecentlyViewedListDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 상품 기록 추가 API
 *
 * @param body - uuid, productId
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await addRecentlyViewed({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', productId: 100 });
 * ```
 *
 * @throws {ZodError} 요청 바디가 유효하지 않을 경우
 */
export const addRecentlyViewed = async (
  body: AddRecentlyViewedBody
): Promise<ApiResponse<null>> => {
  // 요청 바디 검증
  const validatedBody = AddRecentlyViewedBodySchema.parse(body);

  // API 호출 (응답이 없으므로 z.null() 스키마 사용)
  return apiClient.postWithValidation(
    '/api/v1/recently-viewed',
    z.null(),
    validatedBody
  );
};

/**
 * 최근 본 상품 기록 전체 삭제 API
 *
 * @param params - uuid (쿼리 파라미터)
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await deleteAllRecentlyViewed({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않을 경우
 */
export const deleteAllRecentlyViewed = async (
  params: DeleteAllRecentlyViewedParams
): Promise<ApiResponse<DeleteAllRecentlyViewedDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = DeleteAllRecentlyViewedParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.deleteWithValidation(
    '/api/v1/recently-viewed',
    DeleteAllRecentlyViewedDTOSchema,
    { params: validatedParams }
  );
};
