'use client';

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { mapProductDTOsToProducts } from '@/entities/product';
import {
  getProductList,
  getProductSearch,
  PRODUCT_QUERIES,
} from '@/shared/api/endpoints/product';

interface UseProductListingParams {
  keyword: string;
  userUuid: string;
}

// 상품 목록/검색 데이터 조회 + 페이지네이션 상태 관리
export function useProductListing({
  keyword,
  userUuid,
}: UseProductListingParams) {
  const [currentPage, setCurrentPage] = useState(1);
  const isSearchMode = keyword.trim().length > 0;
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: isSearchMode
      ? PRODUCT_QUERIES.search(keyword, currentPage)
      : PRODUCT_QUERIES.list(currentPage),
    queryFn: () =>
      isSearchMode
        ? getProductSearch({
            keyword,
            page: currentPage,
            uuid: userUuid || undefined,
          })
        : getProductList({ page: currentPage }),
  });

  // 검색 결과가 도착하면 최근 검색어 목록도 갱신되도록 무효화
  useEffect(() => {
    if (isSearchMode && data && userUuid) {
      queryClient.invalidateQueries({
        queryKey: ['search-keywords', userUuid],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const products = data?.data.products
    ? mapProductDTOsToProducts(data.data.products)
    : [];
  const totalCount = data?.data.pagination.totalElements || 0;
  const totalPages = data?.data.pagination.totalPages || 1;

  return {
    isSearchMode,
    currentPage,
    setCurrentPage,
    products,
    totalCount,
    totalPages,
    error,
  };
}
