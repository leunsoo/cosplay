'use client';

import { RecentlyViewedList } from '@/features/product-recently-viewed';
import { FavoriteProductList } from '@/features/favorite-product';
import { useLogined } from '@/entities/auth';
import { useAuthStore } from '@/shared/store/authStore';
import { IS_DEMO } from '@/shared/lib/isDemo';

export function MarketSideBar() {
  const logined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  if (!logined) return null;

  return (
    <aside
      className={`hidden lg:flex flex-col gap-4 fixed ${
        IS_DEMO ? 'top-30' : 'top-20'
      } right-[calc((100vw-60vw)/2-var(--spacing-sidebar)-1rem)] z-10 w-sidebar`}
    >
      {/* 찜한 상품 */}
      <FavoriteProductList uuid={userUuid} />

      {/* 최근 본 상품 */}
      <RecentlyViewedList uuid={userUuid} />
    </aside>
  );
}
