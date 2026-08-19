import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '@/shared/api/endpoints/product';

export function useProductDetail(productId: number | undefined) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail({ productId: productId! }),
    enabled: !!productId,
  });

  return {
    productDetail: data?.data ?? null,
    isLoading,
    error,
  };
}
