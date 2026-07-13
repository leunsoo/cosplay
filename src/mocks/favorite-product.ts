import type { FavoriteListDTO } from '@/features/favorite-product/model/schema/getFavoriteList';
import type { FavoriteStatusDTO } from '@/features/favorite-product/model/schema/getFavoriteStatus';

export const mockFavoriteProductList: FavoriteListDTO = {
  totalCount: 2,
  products: [
    {
      productId: 2,
      title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
      price: 58000,
      mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
      favoritedAt: '2025-06-10T14:00:00',
      status: 'SELLING',
    },
    {
      productId: 4,
      title: '아리 코스프레 의상 (리그 오브 레전드)',
      price: 65000,
      mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
      favoritedAt: '2025-06-12T11:00:00',
      status: 'SELLING',
    },
  ],
};

export const mockFavoriteProductStatus: FavoriteStatusDTO = {
  isFavorited: false,
};
