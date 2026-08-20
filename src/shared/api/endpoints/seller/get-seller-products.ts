import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { getDemoSellerProducts } from '@/mocks';

const BadgeLabelSchema = z.enum(['거래제안가능', '배송비포함', '직거래가능']);

const BadgeDTOSchema = z.object({
  label: BadgeLabelSchema,
});

const ProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  createdAt: z.string(),
  badges: z.array(BadgeDTOSchema),
});

const PaginationDTOSchema = z.object({
  currentPage: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
  pageSize: z.number().int().positive(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const GetSellerProductsParamsSchema = z.object({
  sellerId: z.string(),
  page: z.number().int().positive().default(1),
  size: z.number().int().positive().default(8),
});
export type GetSellerProductsParams = z.infer<
  typeof GetSellerProductsParamsSchema
>;

export const SellerProductsResponseSchema = z.object({
  products: z.array(ProductDTOSchema),
  pagination: PaginationDTOSchema,
});
export type SellerProductsDTO = z.infer<typeof SellerProductsResponseSchema>;

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
  const validatedParams = GetSellerProductsParamsSchema.parse(params);

  const { sellerId, ...queryParams } = validatedParams;

  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoSellerProducts(sellerId, queryParams.page, queryParams.size),
    };
  }

  return apiClient.getWithValidation(
    `/api/v1/sellers/${sellerId}/products`,
    SellerProductsResponseSchema,
    {
      params: queryParams,
    }
  );
};
