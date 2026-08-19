import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockProductList } from '@/mocks';
import {
  GetProductListParamsSchema,
  ProductListDTOSchema,
  type GetProductListParams,
  type ProductListDTO,
} from './get-product-list';

// 상품 전체 조회 API (서버 컴포넌트 / prefetchQuery 전용)
//
// apiClient(axios)는 내부적으로 Zustand(useAuthStore)를 참조해
// 서버 컴포넌트에서 사용할 수 없으므로 serverFetch를 사용한다.
// options: 호출부마다 캐싱 정책이 다름 (예: sitemap.ts는 revalidate 3600,
// market/page.tsx는 cache: 'no-store')
export const getProductListServer = async (
  params: GetProductListParams,
  options?: { revalidate?: number; cache?: RequestCache }
): Promise<ApiResponse<ProductListDTO>> => {
  const validatedParams = GetProductListParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockProductList };

  return serverFetch(
    `/api/v1/products?page=${validatedParams.page}`,
    ProductListDTOSchema,
    { revalidate: options?.revalidate, cache: options?.cache }
  );
};
