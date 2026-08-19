import type { FavoriteListDTO } from '@/shared/api/endpoints/favorite-product';
import type { FavoriteStatusDTO } from '@/shared/api/endpoints/favorite-product';
import { mockProductDetails } from './product';

// 데모 모드 찜 상태 (메모리 유지, 새로고침 시 초기화)
export const demoFavoriteProductIds = new Set<number>([2, 4]);

// 찜한 시각은 실제 값이 중요하지 않으므로 찜한 시점의 현재 시각으로 고정
const demoFavoritedAtByProductId = new Map<number, string>(
  [...demoFavoriteProductIds].map((productId) => [
    productId,
    new Date().toISOString(),
  ])
);

export function getDemoFavoriteProductList(): FavoriteListDTO {
  const products = [...demoFavoriteProductIds]
    .map((productId) => mockProductDetails[productId]?.product)
    .filter((product): product is NonNullable<typeof product> => !!product)
    .map((product) => ({
      productId: product.id,
      title: product.title,
      price: product.price,
      mainImageUrl: product.mainImageUrl,
      favoritedAt:
        demoFavoritedAtByProductId.get(product.id) ?? new Date().toISOString(),
      status: product.status as FavoriteListDTO['products'][number]['status'],
    }))
    // 최근 찜한 순으로 정렬 (실제 API의 찜한 시각 최신순 정렬을 재현)
    .sort((a, b) => b.favoritedAt.localeCompare(a.favoritedAt));

  return { totalCount: products.length, products };
}

export function getDemoFavoriteStatus(productId: number): FavoriteStatusDTO {
  return { isFavorited: demoFavoriteProductIds.has(productId) };
}

export function addDemoFavoriteProduct(productId: number): void {
  demoFavoriteProductIds.add(productId);
  demoFavoritedAtByProductId.set(productId, new Date().toISOString());
}

export function removeDemoFavoriteProduct(productId: number): void {
  demoFavoriteProductIds.delete(productId);
  demoFavoritedAtByProductId.delete(productId);
}
