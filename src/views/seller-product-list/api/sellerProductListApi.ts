import { apiClient, type ApiResponse } from '@/shared/api';
import {
  SellerProfileResponseSchema,
  GetSellerProfileParamsSchema,
  type GetSellerProfileParams,
  type SellerProfileDTO,
  SellerProductsResponseSchema,
  GetSellerProductsParamsSchema,
  type GetSellerProductsParams,
  type SellerProductsDTO,
} from '../model/schema';

/**
 * 판매자 프로필 정보 조회 API
 *
 * @param params - sellerUuid
 * @returns 판매자 프로필 데이터
 *
 * @example
 * ```ts
 * const response = await getSellerProfile({ sellerUuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
 * console.log(response.data);
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 응답이 스키마와 일치하지 않을 경우
 */
export const getSellerProfile = async (
  params: GetSellerProfileParams
): Promise<ApiResponse<SellerProfileDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetSellerProfileParamsSchema.parse(params);

  // API 호출 및 응답 검증
  return apiClient.getWithValidation(
    `/api/v1/sellers/${validatedParams.sellerId}`,
    SellerProfileResponseSchema
  );
};

/**
 * 특정 판매자의 상품 목록 조회 API
 *
 * @param params - sellerUuid, page, size
 * @returns 판매자의 상품 목록 및 페이지네이션 정보
 *
 * @example
 * ```ts
 * const response = await getSellerProducts({
 *   sellerUuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
 *   page: 1,
 *   size: 50
 * });
 * console.log(response.data.products);
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 응답이 스키마와 일치하지 않을 경우
 */
export const getSellerProducts = async (
  params: GetSellerProductsParams
): Promise<ApiResponse<SellerProductsDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetSellerProductsParamsSchema.parse(params);

  const { sellerId, ...queryParams } = validatedParams;

  // API 호출 및 응답 검증
  return apiClient.getWithValidation(
    `/api/v1/sellers/${sellerId}/products`,
    SellerProductsResponseSchema,
    {
      params: queryParams,
    }
  );
};
