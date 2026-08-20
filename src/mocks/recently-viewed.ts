import type { RecentlyViewedListDTO } from '@/shared/api/endpoints/recently-viewed';
import { mockProductDetails } from './product';

// 데모 모드 최근 본 상품 상태 (메모리 유지, 새로고침 시 초기화)
// 최신 조회가 앞에 오도록 배열 순서 자체로 관리한다.
const demoRecentlyViewedIds: number[] = [1, 4, 8];
const demoViewedAtByProductId = new Map<number, string>(
  demoRecentlyViewedIds.map((productId, index) => [
    productId,
    new Date(Date.now() - index * 60 * 1000).toISOString(),
  ])
);

export function getDemoRecentlyViewedList(): RecentlyViewedListDTO {
  const products = demoRecentlyViewedIds
    .map((productId) => mockProductDetails[productId]?.product)
    .filter((product): product is NonNullable<typeof product> => !!product)
    .map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      mainImageUrl: product.mainImageUrl,
      viewedAt:
        demoViewedAtByProductId.get(product.id) ?? new Date().toISOString(),
      status:
        product.status as RecentlyViewedListDTO['products'][number]['status'],
    }));

  return { totalCount: products.length, products };
}

export function addDemoRecentlyViewed(productId: number): void {
  const existingIndex = demoRecentlyViewedIds.indexOf(productId);
  if (existingIndex !== -1) demoRecentlyViewedIds.splice(existingIndex, 1);

  demoRecentlyViewedIds.unshift(productId);
  demoViewedAtByProductId.set(productId, new Date().toISOString());
}

export function clearDemoRecentlyViewed(): number {
  const deletedCount = demoRecentlyViewedIds.length;
  demoRecentlyViewedIds.length = 0;
  demoViewedAtByProductId.clear();
  return deletedCount;
}
