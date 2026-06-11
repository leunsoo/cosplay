import { apiClient, type ApiResponse } from '@/shared/api';
import {
  ProductListDTOSchema,
  GetProductListParamsSchema,
  type GetProductListParams,
  type ProductListDTO,
  ProductDetailResponseDTOSchema,
  GetProductDetailParamsSchema,
  type GetProductDetailParams,
  type ProductDetailResponseDTO,
  ProductSearchDTOSchema,
  GetProductSearchParamsSchema,
  type GetProductSearchParams,
  type ProductSearchDTO,
  CreateProductParamsSchema,
  CreateProductBodySchema,
  CreateProductDTOSchema,
  type CreateProductParams,
  type CreateProductBody,
  type CreateProductDTO,
  UploadProductImagesBodySchema,
  UploadProductImagesDTOSchema,
  type UploadProductImagesBody,
  type UploadProductImagesDTO,
  UpdateProductParamsSchema,
  UpdateProductBodySchema,
  UpdateProductDTOSchema,
  type UpdateProductParams,
  type UpdateProductBody,
  type UpdateProductDTO,
  DeleteProductParamsSchema,
  DeleteProductDTOSchema,
  type DeleteProductParams,
  type DeleteProductDTO,
  UpdateProductStatusParamsSchema,
  UpdateProductStatusBodySchema,
  UpdateProductStatusDTOSchema,
  type UpdateProductStatusParams,
  type UpdateProductStatusBody,
  type UpdateProductStatusDTO,
} from '../model'; // schema
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  mockProductList,
  mockProductDetails,
  mockProductSearch,
} from '@/mocks/product';

/**
 * 상품 전체 조회 API
 *
 * @param params - 페이지
 * @returns 상품 목록 및 페이지네이션 정보
 *
 * @example
 * ```ts
 * const response = await getProductList({ page: 1 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getProductList = async (
  params: GetProductListParams
): Promise<ApiResponse<ProductListDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetProductListParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockProductList };

  // API 호출 및 응답 검증
  return apiClient.getWithValidation('/api/v1/products', ProductListDTOSchema, {
    params: validatedParams,
  });
};

/**
 * 상품 상세 조회 API
 *
 * @param params - productId (상품 ID)
 * @returns 상품 상세 정보, 판매자 정보, 판매자의 다른 상품 목록
 *
 * @example
 * ```ts
 * const response = await getProductDetail({ productId: 123 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getProductDetail = async (
  params: GetProductDetailParams
): Promise<ApiResponse<ProductDetailResponseDTO>> => {
  // 1. 요청 파라미터 검증
  const validatedParams = GetProductDetailParamsSchema.parse(params);

  if (IS_DEMO) {
    const detail =
      mockProductDetails[validatedParams.productId] ?? mockProductDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }

  // 2. API 호출 및 응답 검증 (path parameter interpolation)
  return apiClient.getWithValidation(
    `/api/v1/products/${validatedParams.productId}`,
    ProductDetailResponseDTOSchema
  );
};

/**
 * 상품 검색 API
 *
 * @param params - keyword (검색어), page (페이지), uuid (선택)
 * @returns 검색된 상품 목록 및 페이지네이션 정보
 *
 * @example
 * ```ts
 * const response = await getProductSearch({ keyword: '코스프레', page: 1 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getProductSearch = async (
  params: GetProductSearchParams
): Promise<ApiResponse<ProductSearchDTO>> => {
  // 1. 요청 파라미터 검증
  const validatedParams = GetProductSearchParamsSchema.parse(params);

  if (IS_DEMO) {
    return { status: 'SUCCESS', message: '성공', data: mockProductSearch };
  }

  // 2. API 호출 및 응답 검증
  return apiClient.getWithValidation(
    '/api/v1/products/search',
    ProductSearchDTOSchema,
    {
      params: validatedParams,
    }
  );
};

/**
 * 상품 등록 API
 *
 * @param params - uuid (쿼리 파라미터)
 * @param body - 상품 등록 데이터
 * @returns 등록된 상품 정보
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const createProduct = async (
  params: CreateProductParams,
  body: CreateProductBody
): Promise<ApiResponse<CreateProductDTO>> => {
  // 1. 요청 파라미터 및 바디 검증
  const validatedParams = CreateProductParamsSchema.parse(params);
  const validatedBody = CreateProductBodySchema.parse(body);

  // 2. API 호출 및 응답 검증
  return apiClient.postWithValidation(
    '/api/v1/products',
    CreateProductDTOSchema,
    validatedBody,
    { params: validatedParams }
  );
};

/**
 * 이미지 업로드용 Pre-signed URL 발급 API
 *
 * @param body - imageType, imageCount
 * @returns 업로드 URL 목록
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const uploadProductImages = async (
  body: UploadProductImagesBody
): Promise<ApiResponse<UploadProductImagesDTO>> => {
  // 1. 요청 바디 검증
  const validatedBody = UploadProductImagesBodySchema.parse(body);

  // 2. API 호출 및 응답 검증
  return apiClient.postWithValidation(
    '/api/v1/products/upload-urls',
    UploadProductImagesDTOSchema,
    validatedBody
  );
};

/**
 * 상품 수정 API
 *
 * @param params - uuid (쿼리), productId (path)
 * @param body - 상품 수정 데이터
 * @returns 수정된 상품 정보
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const updateProduct = async (
  params: UpdateProductParams,
  body: UpdateProductBody
): Promise<ApiResponse<UpdateProductDTO>> => {
  // 1. 요청 파라미터 및 바디 검증
  const { productId, ...queryParams } = UpdateProductParamsSchema.parse(params);
  const validatedBody = UpdateProductBodySchema.parse(body);

  // 2. API 호출 및 응답 검증
  return apiClient.putWithValidation(
    `/api/v1/products/${productId}`,
    UpdateProductDTOSchema,
    validatedBody,
    { params: queryParams }
  );
};

/**
 * 상품 삭제 API
 *
 * @param params - uuid (쿼리), productId (path)
 * @returns 삭제된 상품 ID 및 상태
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const deleteProduct = async (
  params: DeleteProductParams
): Promise<ApiResponse<DeleteProductDTO>> => {
  // 1. 요청 파라미터 검증
  const { productId, ...queryParams } = DeleteProductParamsSchema.parse(params);

  // 2. API 호출 및 응답 검증
  return apiClient.deleteWithValidation(
    `/api/v1/products/${productId}`,
    DeleteProductDTOSchema,
    { params: queryParams }
  );
};

/**
 * 상품 상태 변경 API
 *
 * @param params - uuid (쿼리), productId (path)
 * @param body - status (SELLING | RESERVED | SOLD)
 * @returns 변경된 상품 ID, 상태, 수정 시각
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const updateProductStatus = async (
  params: UpdateProductStatusParams,
  body: UpdateProductStatusBody
): Promise<ApiResponse<UpdateProductStatusDTO>> => {
  // 1. 요청 파라미터 및 바디 검증
  const { productId, ...queryParams } =
    UpdateProductStatusParamsSchema.parse(params);
  const validatedBody = UpdateProductStatusBodySchema.parse(body);

  // 2. API 호출 및 응답 검증
  return apiClient.patchWithValidation(
    `/api/v1/products/${productId}/status`,
    UpdateProductStatusDTOSchema,
    validatedBody,
    { params: queryParams }
  );
};
