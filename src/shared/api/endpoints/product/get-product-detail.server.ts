import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import {
  GetProductDetailParamsSchema,
  ProductDetailResponseDTOSchema,
  resolveDemoProductDetail,
  type GetProductDetailParams,
  type ProductDetailResponseDTO,
} from './get-product-detail';

// 상품 상세 조회 API (서버 컴포넌트 / prefetchQuery 전용)
//
// apiClient(axios)는 내부적으로 Zustand(useAuthStore)를 참조해
// 서버 컴포넌트에서 사용할 수 없으므로 serverFetch를 사용한다.
//
// 반환값이 null이면 "상품이 존재하지 않음"(404) — 호출부에서 notFound() 등으로 처리.
export const getProductDetailServer = async (
  params: GetProductDetailParams
): Promise<ApiResponse<ProductDetailResponseDTO> | null> => {
  const validatedParams = GetProductDetailParamsSchema.parse(params);

  if (IS_DEMO) return resolveDemoProductDetail(validatedParams.productId);

  return serverFetch(
    `/api/v1/products/${validatedParams.productId}`,
    ProductDetailResponseDTOSchema,
    { revalidate: 300, tags: ['products'], notFoundStatus: 404 }
  );
};
