'use client';

import { useParams } from 'next/navigation';
import { ProductGrid } from '@/entities/product';
import { PaginationControl, ErrorState } from '@/shared/ui';
import { SellerProfileCard } from './SellerProfileCard';
import { TabNavigation, type Tab } from './TabNavigation';
import { LoadingState } from './LoadingState';
import { useSellerProfile } from '../api/use-seller-profile';
import { useSellerProducts } from '../api/use-seller-products';

export function SellerProductListPage() {
  const params = useParams();
  const sellerUuid = params.id as string;

  const {
    sellerProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useSellerProfile(sellerUuid);
  const {
    products,
    pagination,
    currentPage,
    setCurrentPage,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useSellerProducts(sellerUuid);

  const isLoading = isLoadingProfile || isLoadingProducts;
  const error = profileError || productsError;

  // 잘못된 seller UUID
  if (!sellerUuid) {
    return <ErrorState message="잘못된 판매자 입니다." />;
  }

  // 로딩 상태
  if (isLoading) {
    return <LoadingState />;
  }

  // 에러 상태
  if (error) {
    return (
      <ErrorState
        message="판매자 정보를 불러오는데 실패했습니다."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const productCount = pagination?.totalElements || 0;

  // 탭 구성
  const tabs: Tab[] = [
    {
      id: 'products',
      label: '판매 상품',
      count: productCount,
      isActive: true,
    },
  ];

  if (!sellerProfile) {
    return <ErrorState message="판매자 정보를 찾을 수 없습니다." />;
  }

  return (
    <main className="flex flex-col min-w-0 overflow-y-auto gap-4">
      {/* 프로필 카드 */}
      <SellerProfileCard {...sellerProfile} />

      {/* 탭 메뉴 */}
      <TabNavigation tabs={tabs} />

      {/* 상품이 없을 경우 */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          판매 중인 상품이 없습니다.
        </div>
      ) : (
        /* 상품 그리드 */
        <>
          <ProductGrid products={products} />
          <PaginationControl
            currentPage={currentPage}
            totalPages={pagination?.totalPages || 1}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
