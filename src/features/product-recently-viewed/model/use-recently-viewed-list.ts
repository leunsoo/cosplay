import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getRecentlyViewedList } from '../api/get-recently-viewed-list';
import { mapRecentlyViewedProductToSidePanelProduct } from '../api/mapper';

const ITEMS_PER_PAGE = 3;

interface UseRecentlyViewedListParams {
  uuid: string;
}

export function useRecentlyViewedList({ uuid }: UseRecentlyViewedListParams) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['recently-viewed', uuid],
    queryFn: () => getRecentlyViewedList({ uuid }),
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
