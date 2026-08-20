'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Seller } from '@/shared/api/endpoints/product';
import { useAuthStore } from '@/shared/auth';
import { useLogined } from '@/entities/auth';
import { ROUTES } from '@/shared/routes';
import { useUpdateProductStatus } from '../api/use-update-product-status';
import { useDeleteProduct } from '../api/use-delete-product';
import { SellerInfoCard } from './SellerInfoCard';
import { FavoriteButton } from './FavoriteButton';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';

const PRODUCT_STATUS_OPTIONS = [
  { value: 'SELLING', label: '판매중' },
  // { value: 'RESERVED', label: '예약중' },
  { value: 'SOLD', label: '판매완료' },
] as const;

type ProductStatus = (typeof PRODUCT_STATUS_OPTIONS)[number]['value'];

interface ProductInfoProps {
  productId: number;
  title: string;
  mainImageUrl: string;
  price: number;
  shippingType: string;
  deliveryMethod: string;
  directTradeLocation: string | null;
  deliveryPrice: number | null;
  directTradePlace: string | null;
  registeredDate: string;
  seller: Seller;
  currentStatus: string;
  isOwner: boolean;
  onChatClick?: () => void;
}

export function ProductInfo({
  productId,
  title,
  mainImageUrl,
  price,
  shippingType,
  deliveryMethod,
  directTradeLocation,
  directTradePlace,
  deliveryPrice,
  registeredDate,
  seller,
  currentStatus,
  isOwner,
  onChatClick,
}: ProductInfoProps) {
  const router = useRouter();
  const logined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<ProductStatus>(
    (currentStatus as ProductStatus) ?? 'SELLING'
  );

  const { mutate: changeStatus, isPending: isStatusPending } =
    useUpdateProductStatus({ userUuid, productId });

  const { mutate: removeProduct, isPending: isDeletePending } =
    useDeleteProduct({ userUuid, productId });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ProductStatus;
    changeStatus(newStatus, { onSuccess: () => setStatus(newStatus) });
  };

  const openDeleteDialog = () => deleteDialogRef.current?.showModal();
  const closeDeleteDialog = () => deleteDialogRef.current?.close();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === deleteDialogRef.current) closeDeleteDialog();
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1
            className="font-bold text-gray-900 leading-tight mb-2 wrap-break-word"
            style={{ fontSize: '22px' }}
          >
            {title}
          </h1>
        </div>
        {logined && (
          <div className="shrink-0">
            <FavoriteButton
              productId={productId}
              title={title}
              price={price}
              mainImageUrl={mainImageUrl}
            />
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mt-6 flex items-end gap-1 pb-6 border-b border-gray-100">
        <span className="text-4xl font-black text-gray-900">
          {price.toLocaleString()}
        </span>
        <span className="text-xl font-bold text-gray-900">원</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 text-sm mt-6 mb-8">
        <span className="text-gray-500">배송방법</span>
        <span className="text-gray-900">{deliveryMethod}</span>

        {shippingType === 'SEPARATE' && (
          <>
            <span className="text-gray-500">배송비</span>
            <span className="text-gray-900">{deliveryPrice} 원</span>
          </>
        )}

        {directTradeLocation && (
          <>
            <span className="text-gray-500">직거래 지역</span>
            <span className="text-gray-900">{directTradeLocation}</span>
            <span className="text-gray-500">상세 장소</span>
            <span className="text-gray-900"> {directTradePlace}</span>
          </>
        )}

        <span className="text-gray-500">등록일</span>
        <span className="text-gray-900">{registeredDate}</span>
      </div>

      {isOwner ? (
        <div className="mt-auto flex flex-col gap-3">
          {/* 상태 변경 */}
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={isStatusPending}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white disabled:opacity-50 cursor-pointer"
          >
            {PRODUCT_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* 수정 / 삭제 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => router.push(ROUTES.PRODUCT.EDIT(productId))}
              className="flex-1 h-12 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              수정
            </button>
            <button
              onClick={openDeleteDialog}
              className="flex-1 h-12 border border-red-300 rounded-lg font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              삭제
            </button>
          </div>

          <ConfirmDialog
            dialogRef={deleteDialogRef}
            content={{
              title: '상품을 삭제할까요?',
              description: '삭제한 상품은 복구할 수 없습니다.',
              confirmLabel: '삭제',
              pendingLabel: '삭제 중...',
            }}
            isPending={isDeletePending}
            onConfirm={() => removeProduct()}
            onCancel={closeDeleteDialog}
            onBackdropClick={handleBackdropClick}
          />
        </div>
      ) : (
        <>
          {/* Seller Info */}
          <SellerInfoCard seller={seller} />
          {/* Action Buttons */}
          <div className="mt-auto flex gap-3">
            <button
              onClick={onChatClick}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white h-12 rounded-lg font-bold text-lg shadow-md transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
              채팅으로 거래하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
