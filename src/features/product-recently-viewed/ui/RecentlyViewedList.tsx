'use client';

import { useRecentlyViewedList, useDeleteAllRecentlyViewed } from '../model';
import { ProductSidePanel } from '@/entities/product';
import { ConfirmDialog } from '@/shared/ui';

interface RecentlyViewedListProps {
  uuid: string;
}

export function RecentlyViewedList({ uuid }: RecentlyViewedListProps) {
  const {
    isLoading,
    totalCount,
    currentProducts,
    currentPage,
    totalPages,
    setCurrentPage,
    handleProductClick,
  } = useRecentlyViewedList({ uuid });

  const {
    dialogRef,
    isPending,
    openDialog,
    closeDialog,
    handleBackdropClick,
    handleConfirm,
  } = useDeleteAllRecentlyViewed({
    uuid,
    onSuccess: () => setCurrentPage(1),
  });

  return (
    <ProductSidePanel
      title="최근본상품"
      totalCount={totalCount}
      isLoading={isLoading}
      products={currentProducts}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onProductClick={handleProductClick}
      headerAction={
        <button
          onClick={openDialog}
          className="text-gray-400 hover:text-gray-600 transition-colors flex items-center cursor-pointer"
          title="전체 삭제"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '14px' }}
          >
            delete
          </span>
        </button>
      }
      dialog={
        <ConfirmDialog
          dialogRef={dialogRef}
          content={{
            title: '기록 삭제',
            description: '최근 본 상품 기록을 모두 삭제하시겠습니까?',
            confirmLabel: '예',
            cancelLabel: '아니오',
            pendingLabel: '삭제 중...',
          }}
          isPending={isPending}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
          onBackdropClick={handleBackdropClick}
        />
      }
    />
  );
}
