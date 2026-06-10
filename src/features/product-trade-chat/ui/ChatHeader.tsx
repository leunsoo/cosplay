import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core/config/routes';
import { ProductInfo } from '../model/types';

interface ChatHeaderProps extends ProductInfo {
  onLeave?: () => void;
}

export function ChatHeader({
  productImage,
  productTitle,
  productPrice,
  productId,
  opponentUuid,
  onLeave,
}: ChatHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-3 py-3 sm:p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 shrink-0 min-w-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-lg bg-cover bg-center border border-gray-200 shadow-sm cursor-pointer shrink-0"
          style={{ backgroundImage: `url('${productImage}')` }}
          onClick={() =>
            productId && router.push(ROUTES.PRODUCT.DETAIL(productId))
          }
        ></div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-gray-900 truncate max-w-35 sm:max-w-none">
            {productTitle}
          </span>
          {productPrice !== undefined && (
            <span className="text-sm sm:text-base font-black text-gray-900">
              {productPrice.toLocaleString()}원
            </span>
          )}
          {opponentUuid && (
            <button
              onClick={() => router.push(ROUTES.SELLER.PRODUCTS(opponentUuid))}
              className="text-xs text-gray-500 hover:text-gray-600 text-left"
            >
              다른 상품 보기
            </button>
          )}
        </div>
      </div>
      {onLeave && (
        <button
          onClick={onLeave}
          className="flex items-center gap-1 px-2 py-1.5 sm:px-3 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span className="hidden sm:inline">나가기</span>
        </button>
      )}
    </div>
  );
}
