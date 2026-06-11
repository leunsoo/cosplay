import type { FavoriteEventListDTO } from '@/features/favorite-event/model/schema/getFavoriteEventList';
import type { FavoriteEventStatusDTO } from '@/features/favorite-event/model/schema/getFavoriteEventStatus';
import type { FavoriteMeetupListDTO } from '@/features/favorite-meetup/model/schema/getFavoriteMeetupList';
import type { FavoriteMeetupStatusDTO } from '@/features/favorite-meetup/model/schema/getFavoriteMeetupStatus';
import type { FavoriteListDTO } from '@/features/favorite-product/model/schema/getFavoriteList';
import type { FavoriteStatusDTO } from '@/features/favorite-product/model/schema/getFavoriteStatus';

export const mockFavoriteEventList: FavoriteEventListDTO = {
  totalCount: 2,
  events: [
    {
      eventId: 1,
      title: '코믹월드 2025 서울',
      thumbnailUrl: 'https://picsum.photos/seed/event-comic/600/400',
      startDate: '2025-08-02',
      endDate: '2025-08-03',
      location: '서울 COEX 전시홀',
      price: 5000,
      status: 'UPCOMING',
      category: '코믹',
      favoritedAt: '2025-06-01T12:00:00',
    },
    {
      eventId: 5,
      title: '코스프레 그랜드 챔피언십 2025',
      thumbnailUrl: 'https://picsum.photos/seed/event-champ/600/400',
      startDate: '2025-09-06',
      endDate: '2025-09-07',
      location: '부산 벡스코 오디토리움',
      price: 10000,
      status: 'UPCOMING',
      category: '대회',
      favoritedAt: '2025-06-05T10:00:00',
    },
  ],
};

export const mockFavoriteEventStatus: FavoriteEventStatusDTO = {
  isFavorited: false,
};

export const mockFavoriteMeetupList: FavoriteMeetupListDTO = {
  totalCount: 1,
  meetups: [
    {
      meetupId: 1,
      title: '원피스 코스프레 팬미팅 @ 홍대',
      thumbnailUrl: 'https://picsum.photos/seed/meetup-onepiece/600/400',
      scheduledAt: '2025-07-26T14:00:00',
      location: '서울 홍대 공연장',
      maxMembers: 20,
      currentMembers: 13,
      status: 'ONGOING',
      favoritedAt: '2025-06-15T09:00:00',
    },
  ],
};

export const mockFavoriteMeetupStatus: FavoriteMeetupStatusDTO = {
  isFavorited: false,
};

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
