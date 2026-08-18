import type { SidePanelProduct } from '@/entities/product';
import type { FavoriteListDTO } from '@/shared/api/favorite-product';
import type { RecentlyViewedListDTO } from '../api/get-recently-viewed-list';

export function mapFavoriteProductToSidePanelProduct(
  dto: FavoriteListDTO['products'][number]
): SidePanelProduct {
  return {
    id: dto.productId,
    image: dto.mainImageUrl,
    title: dto.title,
    status: dto.status,
  };
}

export function mapRecentlyViewedProductToSidePanelProduct(
  dto: RecentlyViewedListDTO['products'][number]
): SidePanelProduct {
  return {
    id: dto.id,
    image: dto.mainImageUrl,
    title: dto.title,
    status: dto.status,
  };
}
