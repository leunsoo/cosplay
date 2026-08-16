'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  deleteFavorite,
  FAVORITE_PRODUCT_QUERIES,
} from '@/shared/api/favorite-product';
import { mapFavoriteProductToSidePanelProduct } from './mapper';

const ITEMS_PER_PAGE = 3;

interface UseFavoriteProductPanelParams {
  uuid: string;
}

// 사이드바 찜 패널 전용: 페이지네이션 + 목록 제거 + 클릭 이동
export function useFavoriteProductPanel({
  uuid,
}: UseFavoriteProductPanelParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    ...FAVORITE_PRODUCT_QUERIES.list(uuid),
    staleTime: 0,
    gcTime: 0,
  });

  const favorites = data?.data;
  const products = (favorites?.products ?? []).map(
    mapFavoriteProductToSidePanelProduct
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductClick = (productId: number) => {
    router.push(`/market/products/${productId}`);
  };

  const removeMutation = useMutation({
    mutationFn: (productId: number) => deleteFavorite({ uuid, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_PRODUCT_QUERIES.all(),
      });
      // 마지막 페이지에서 항목을 제거했을 때 페이지 보정
      const nextProducts = (favorites?.products ?? []).filter(
        (p) => p.productId !== removeMutation.variables
      );
      const nextTotalPages = Math.ceil(nextProducts.length / ITEMS_PER_PAGE);
      if (currentPage > nextTotalPages && nextTotalPages > 0) {
        setCurrentPage(nextTotalPages);
      }
    },
  });

  const handleProductRemove = (productId: number) => {
    removeMutation.mutate(productId);
  };

  return {
    isLoading,
    totalCount: favorites?.totalCount ?? 0,
    currentProducts,
    currentPage,
    totalPages,
    setCurrentPage,
    handleProductClick,
    handleProductRemove,
  };
}
