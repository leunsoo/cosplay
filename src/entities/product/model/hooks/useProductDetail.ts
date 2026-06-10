'use client';

import { useQuery } from '@tanstack/react-query';
import { getProductDetail } from '../../api';
import { mapProductDetailResponseDTOToProductDetailWithSeller } from '../mapper';
import type { ProductDetailWithSeller } from '../types';

interface UseProductDetailResult {
  productDetail: ProductDetailWithSeller | null;
  isLoading: boolean;
  error: Error | null;
}

export function useProductDetail(productId: number): UseProductDetailResult {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetail({ productId }),
  });

  const productDetail = data?.data
    ? mapProductDetailResponseDTOToProductDetailWithSeller(data.data)
    : null;

  return {
    productDetail,
    isLoading,
    error,
  };
}
