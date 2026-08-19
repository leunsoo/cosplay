import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
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
export const getProductDetailServer = async (
  params: GetProductDetailParams
): Promise<ApiResponse<ProductDetailResponseDTO>> => {
  const validatedParams = GetProductDetailParamsSchema.parse(params);

  if (IS_DEMO) return resolveDemoProductDetail(validatedParams.productId);

  return serverFetch(
    `/api/v1/products/${validatedParams.productId}`,
    ProductDetailResponseDTOSchema,
    { revalidate: 300, tags: ['products'] }
  );
};
