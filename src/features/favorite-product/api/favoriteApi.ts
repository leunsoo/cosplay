import { apiClient, type ApiResponse } from '@/shared/api';
import {
  FavoriteListDTOSchema,
  GetFavoriteListParamsSchema,
  type GetFavoriteListParams,
  type FavoriteListDTO,
  FavoriteStatusDTOSchema,
  GetFavoriteStatusParamsSchema,
  type GetFavoriteStatusParams,
  type FavoriteStatusDTO,
  AddFavoriteParamsSchema,
  AddFavoriteBodySchema,
  type AddFavoriteParams,
  type AddFavoriteBody,
  DeleteFavoriteParamsSchema,
  type DeleteFavoriteParams,
  FavoriteActionResponseSchema,
  type FavoriteActionResponse,
} from '../model';

/**
 * 찜한 상품 목록 조회 API
 *
 * @param params - uuid (path parameter)
 * @returns 찜한 상품 목록 및 총 개수
 *
 * @example
 * ```ts
 * const response = await getFavoriteList({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getFavoriteList = async (
  params: GetFavoriteListParams
): Promise<ApiResponse<FavoriteListDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetFavoriteListParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites`,
    FavoriteListDTOSchema
  );
};

/**
 * 찜 상태 조회 API
 *
 * @param params - uuid, productId (path parameters)
 * @returns 찜 여부
 *
 * @example
 * ```ts
 * const response = await getFavoriteStatus({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', productId: 100 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getFavoriteStatus = async (
  params: GetFavoriteStatusParams
): Promise<ApiResponse<FavoriteStatusDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetFavoriteStatusParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites/${validatedParams.productId}/status`,
    FavoriteStatusDTOSchema
  );
};

/**
 * 상품 찜하기 API
 *
 * @param params - uuid (path parameter)
 * @param body - productId
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await addFavorite({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }, { productId: "100" });
 * ```
 *
 * @throws {ZodError} 요청이 유효하지 않을 경우
 */
export const addFavorite = async (
  params: AddFavoriteParams,
  body: AddFavoriteBody
): Promise<ApiResponse<FavoriteActionResponse>> => {
  // 요청 파라미터 및 바디 검증
  const validatedParams = AddFavoriteParamsSchema.parse(params);
  const validatedBody = AddFavoriteBodySchema.parse(body);

  // API 호출 및 응답 검증
  return apiClient.postWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites`,
    FavoriteActionResponseSchema,
    validatedBody
  );
};

/**
 * 찜하기 취소 API
 *
 * @param params - uuid, productId (path parameters)
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await deleteFavorite({ uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', productId: 100 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않을 경우
 */
export const deleteFavorite = async (
  params: DeleteFavoriteParams
): Promise<ApiResponse<FavoriteActionResponse>> => {
  // 요청 파라미터 검증
  const validatedParams = DeleteFavoriteParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.deleteWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites/${validatedParams.productId}`,
    FavoriteActionResponseSchema
  );
};
