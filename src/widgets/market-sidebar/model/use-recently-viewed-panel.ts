'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';
import { getRecentlyViewedList } from '../api/get-recently-viewed-list';
import { mapRecentlyViewedProductToSidePanelProduct } from './mapper';

const ITEMS_PER_PAGE = 3;

interface UseRecentlyViewedPanelParams {
  uuid: string;
}

// 사이드바 최근 본 상품 패널 전용: 페이지네이션 + 클릭 이동
export function useRecentlyViewedPanel({ uuid }: UseRecentlyViewedPanelParams) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: RECENTLY_VIEWED_QUERIES.list(uuid),
    queryFn: () => getRecentlyViewedList({ uuid }),
    enabled: !!uuid,
    staleTime: 0,
    gcTime: 0,
  });

  const recentlyViewed = data?.data;
  const products = (recentlyViewed?.products ?? []).map(
    mapRecentlyViewedProductToSidePanelProduct
  );

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleProductClick = (productId: number) => {
    router.push(`/market/products/${productId}`);
  };

  return {
    isLoading,
    totalCount: recentlyViewed?.totalCount ?? 0,
    currentProducts,
    currentPage,
    totalPages,
    setCurrentPage,
    handleProductClick,
  };
}
