import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockProductList, addDemoSearchKeyword } from '@/mocks';

// 상품 검색 API

const BadgeLabelSchema = z.enum(['거래제안가능', '배송비포함', '직거래가능']);

const BadgeDTOSchema = z.object({
  label: BadgeLabelSchema,
});

const ProductSearchItemDTOSchema = z.object({
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

export const GetProductSearchParamsSchema = z.object({
  keyword: z.string().min(1),
  page: z.number().int().positive(),
  uuid: z.string().optional(),
});
export type GetProductSearchParams = z.infer<
  typeof GetProductSearchParamsSchema
>;

export const ProductSearchDTOSchema = z.object({
  products: z.array(ProductSearchItemDTOSchema),
  pagination: PaginationDTOSchema,
});
export type ProductSearchDTO = z.infer<typeof ProductSearchDTOSchema>;

export const getProductSearch = async (
  params: GetProductSearchParams
): Promise<ApiResponse<ProductSearchDTO>> => {
  const validatedParams = GetProductSearchParamsSchema.parse(params);

  if (IS_DEMO) {
    if (validatedParams.uuid) {
      addDemoSearchKeyword(validatedParams.keyword);
    }

    const PAGE_SIZE = 10;
    const matched = mockProductList.products.filter((product) =>
      product.title
        .toLowerCase()
        .includes(validatedParams.keyword.toLowerCase())
    );
    const totalElements = matched.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
    const start = (validatedParams.page - 1) * PAGE_SIZE;
    const products = matched.slice(start, start + PAGE_SIZE);

    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        products,
        pagination: {
          currentPage: validatedParams.page,
          totalPages,
          totalElements,
          pageSize: PAGE_SIZE,
          hasNext: validatedParams.page < totalPages,
          hasPrevious: validatedParams.page > 1,
        },
      },
    };
  }

  return apiClient.getWithValidation(
    '/api/v1/products/search',
    ProductSearchDTOSchema,
    {
      params: validatedParams,
    }
  );
};
