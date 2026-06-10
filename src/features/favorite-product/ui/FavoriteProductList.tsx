'use client';

import { useFavoriteList } from '../model';
import { ProductSidePanel } from '@/entities/product';

interface FavoriteProductListProps {
  uuid: string;
}

export function FavoriteProductList({ uuid }: FavoriteProductListProps) {
  const {
    isLoading,
    totalCount,
    currentProducts,
    currentPage,
    totalPages,
    setCurrentPage,
    handleProductClick,
    handleProductRemove,
  } = useFavoriteList({ uuid });

  return (
    <ProductSidePanel
      title="찜한상품"
      totalCount={totalCount}
      isLoading={isLoading}
      products={currentProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onProductClick={handleProductClick}
      onProductRemove={handleProductRemove}
    />
  );
}
