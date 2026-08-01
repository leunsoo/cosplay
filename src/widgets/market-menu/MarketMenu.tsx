'use client';

import { useRouter } from 'next/navigation';
import { ProductSearchInput } from '@/features/product-search';
import { useLogined } from '@/entities/auth';
import { useAuthStore } from '@/shared/auth/authStore';
import { ROUTES } from '@/shared/routes';

export function MarketMenu() {
  const router = useRouter();
  const logined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  const handleGuardedNavigate = (href: string) => {
    if (!logined) {
      router.push(`${ROUTES.LOGIN}?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  };

  return (
    <div className="w-full pb-4">
      <div className="flex items-start gap-6">
        {/* Search Input with Recent Searches */}
        <ProductSearchInput />

        {/* Action Buttons — 데스크탑 전용 */}
        <div className="hidden md:flex items-center gap-4">
          {/* 판매하기 */}
          <button
            onClick={() => handleGuardedNavigate(ROUTES.PRODUCT.REGISTER)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">
                refresh
              </span>
            </div>
            <span className="text-xs text-gray-600 font-medium">판매하기</span>
          </button>

          {/* 내상점 */}
          <button
            onClick={() =>
              handleGuardedNavigate(ROUTES.SELLER.PRODUCTS(userUuid))
            }
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">
                person
              </span>
            </div>
            <span className="text-xs text-gray-600 font-medium">내상점</span>
          </button>

          {/* 채팅 */}
          <button
            onClick={() => handleGuardedNavigate(ROUTES.CHAT)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-gray-600 group-hover:text-primary transition-colors">
                chat_bubble
              </span>
            </div>
            <span className="text-xs text-gray-600 font-medium">채팅</span>
          </button>
        </div>
      </div>
    </div>
  );
}
