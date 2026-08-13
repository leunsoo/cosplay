import type { Product } from '@/entities/product';
import type { FavoriteListDTO } from '@/shared/api/favorite-product';

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
