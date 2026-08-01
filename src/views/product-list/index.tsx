'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ProductGrid,
  getProductList,
  getProductSearch,
  mapProductDTOsToProducts,
} from '@/entities/product';
import { useAuthStore } from '@/shared/auth/authStore';
import { useLogined } from '@/entities/auth';
import { useFavoriteList } from '@/features/favorite-product';
import { PaginationControl } from '@/shared/ui';
import { Header } from './ui';

interface ProductListViewProps {
  keyword?: string;
}

export function ProductListView({ keyword = '' }: ProductListViewProps) {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const isLogined = useLogined();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);

  const isSearchMode = keyword.trim().length > 0;
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: isSearchMode
      ? ['product-search', keyword, currentPage]
      : ['products', currentPage],
    queryFn: () =>
      isSearchMode
        ? getProductSearch({
            keyword,
            page: currentPage,
            uuid: userUuid || undefined,
          })
        : getProductList({ page: currentPage }),
  });

  const { allProductsAsCards, handleProductClick: handleFavoriteClick } =
    useFavoriteList({ uuid: userUuid });

  useEffect(() => {
    if (isSearchMode && data && userUuid) {
      queryClient.invalidateQueries({
        queryKey: ['search-keywords', userUuid],
      });
    }
    // eslint-disable-next-line
  }, [data]);

  if (error) {
    return null;
  }

  const products = data?.data.products
    ? mapProductDTOsToProducts(data.data.products)
    : [];
  const totalCount = data?.data.pagination.totalElements || 0;
  const totalPages = data?.data.pagination.totalPages || 1;

  return (
    <div className="flex flex-col gap-8 pb-20">
      <main className="flex flex-col gap-6 min-w-0">
        <Header
          title={isSearchMode ? `"${keyword}" 검색 결과` : '전체 상품'}
          count={totalCount}
          showFavorites={showFavorites}
          onToggleFavorites={
            isLogined ? () => setShowFavorites((prev) => !prev) : undefined
          }
        />

        {/* 모바일 찜 목록 */}
        {showFavorites ? (
          <div className="md:hidden flex flex-col gap-4">
            {allProductsAsCards.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10">
                찜한 상품이 없습니다.
              </p>
            ) : (
              <ProductGrid
                products={allProductsAsCards}
                onProductClick={handleFavoriteClick}
              />
            )}
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              onProductClick={(productId) =>
                router.push(`/market/products/${productId}`)
              }
            />
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
