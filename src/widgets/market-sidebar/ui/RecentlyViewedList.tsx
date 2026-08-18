'use client';

import { useRef } from 'react';
import { useRecentlyViewedPanel } from '../model/use-recently-viewed-panel';
import { useDeleteAllRecentlyViewed } from '../api/delete-all-recently-viewed';
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
  } = useRecentlyViewedPanel({ uuid });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!clickedInDialog) {
      dialog.close();
    }
  };

  const deleteAllMutation = useDeleteAllRecentlyViewed(uuid);
  const handleConfirm = () => {
    deleteAllMutation.mutate(undefined, {
      onSuccess: () => {
        setCurrentPage(1);
        closeDialog();
      },
    });
  };

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
          isPending={deleteAllMutation.isPending}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
          onBackdropClick={handleBackdropClick}
        />
      }
    />
  );
}
