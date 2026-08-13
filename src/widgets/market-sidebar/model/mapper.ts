import type { SidePanelProduct } from '@/entities/product';
import type { FavoriteListDTO } from '@/shared/api/favorite-product';

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
