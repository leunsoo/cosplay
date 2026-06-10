import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getFavoriteList, deleteFavorite } from '../../api';
import {
  mapFavoriteProductToSidePanelProduct,
  mapFavoriteProductToProduct,
} from '../mapper';

const ITEMS_PER_PAGE = 3;

interface UseFavoriteListParams {
  uuid: string;
}

export function useFavoriteList({ uuid }: UseFavoriteListParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  // 찜한 상품 조회
  const { data, isLoading } = useQuery({
    queryKey: ['favorite', uuid],
    queryFn: () => getFavoriteList({ uuid }),
    enabled: !!uuid,
    staleTime: 0,
    gcTime: 0,
  });

  const favorites = data?.data;
  const products = (favorites?.products ?? []).map(
    mapFavoriteProductToSidePanelProduct
  );
  const allProductsAsCards = (favorites?.products ?? []).map(
    mapFavoriteProductToProduct
  );
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // 현재 페이지에 표시할 상품
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductClick = (productId: number) => {
    router.push(`/market/products/${productId}`);
  };

  // 찜 목록에서 제거 (X 버튼)
  const removeMutation = useMutation({
    mutationFn: (productId: number) => deleteFavorite({ uuid, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite', uuid] });
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
    allProductsAsCards,
    currentPage,
    totalPages,
    setCurrentPage,
    handleProductClick,
    handleProductRemove,
  };
}
