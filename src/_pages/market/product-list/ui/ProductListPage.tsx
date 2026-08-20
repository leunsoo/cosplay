'use client';

import { useState } from 'react';
import { ProductGrid } from '@/entities/product';
import { useAuthStore, useLogined } from '@/shared/auth';
import { useProductListing } from '../model/use-product-listing';
import { useFavoriteProductCards } from '../api/use-favorite-product-cards';
import { PaginationControl } from '@/shared/ui';
import { Header } from './Header';

interface ProductListPageProps {
  keyword?: string;
}

export function ProductListPage({ keyword = '' }: ProductListPageProps) {
  const userUuid = useAuthStore((state) => state.userUuid);
  const isLogined = useLogined();
  const [showFavorites, setShowFavorites] = useState(false);

  const {
    isSearchMode,
    currentPage,
    setCurrentPage,
    products,
    totalCount,
    totalPages,
    error,
  } = useProductListing({ keyword, userUuid });

  const { products: allProductsAsCards } = useFavoriteProductCards({
    uuid: userUuid,
  });

  if (error) {
    return null;
  }

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
              <ProductGrid products={allProductsAsCards} />
            )}
          </div>
        ) : (
          <>
            <ProductGrid products={products} />
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
