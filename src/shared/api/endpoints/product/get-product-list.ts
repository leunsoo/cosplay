import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockProductList } from '@/mocks';

// 상품 전체 조회 API

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

export const GetProductListParamsSchema = z.object({
  page: z.number().int().positive(),
});
export type GetProductListParams = z.infer<typeof GetProductListParamsSchema>;

export const ProductListDTOSchema = z.object({
  products: z.array(ProductDTOSchema),
  pagination: PaginationDTOSchema,
});
export type ProductListDTO = z.infer<typeof ProductListDTOSchema>;

export const getProductList = async (
  params: GetProductListParams
): Promise<ApiResponse<ProductListDTO>> => {
  const validatedParams = GetProductListParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockProductList };

  return apiClient.getWithValidation('/api/v1/products', ProductListDTOSchema, {
    params: validatedParams,
  });
};
