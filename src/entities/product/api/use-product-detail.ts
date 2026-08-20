import { useQuery } from '@tanstack/react-query';
import {
  getProductDetail,
  PRODUCT_QUERIES,
} from '@/shared/api/endpoints/product';

export function useProductDetail(productId: number | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: PRODUCT_QUERIES.detail(productId ?? 0),
    queryFn: () => getProductDetail({ productId: productId! }),
    enabled: !!productId,
  });

  return {
    productDetail: data?.data ?? null,
    isLoading,
    error,
  };
}
