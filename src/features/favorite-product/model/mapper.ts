import type { Product, SidePanelProduct } from '@/entities/product';
import type { FavoriteListDTO } from './schema/getFavoriteList';

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

export function mapFavoriteProductToProduct(
  dto: FavoriteListDTO['products'][number]
): Product {
  return {
    id: dto.productId,
    image: dto.mainImageUrl,
    title: dto.title,
    price: dto.price,
    createdAt: new Date(dto.favoritedAt),
  };
}
