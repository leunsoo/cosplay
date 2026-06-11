import type { RecentlyViewedListDTO } from '@/features/product-recently-viewed/model/schema/getRecentlyViewedList';

export const mockRecentlyViewedList: RecentlyViewedListDTO = {
  products: [
    {
      id: 1,
      title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
      price: 35000,
      mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
      viewedAt: '2025-06-11T10:00:00',
      status: 'SELLING',
    },
    {
      id: 4,
      title: '아리 코스프레 의상 (리그 오브 레전드)',
      price: 65000,
      mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
      viewedAt: '2025-06-10T15:00:00',
      status: 'SELLING',
    },
    {
      id: 8,
      title: '고죠 사토루 안대 & 교복 (주술회전)',
      price: 32000,
      mainImageUrl: 'https://picsum.photos/seed/prod-gojo/400/400',
      viewedAt: '2025-06-09T13:00:00',
      status: 'SELLING',
    },
  ],
  totalCount: 3,
};
