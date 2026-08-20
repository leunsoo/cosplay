import type { BannersDTO } from '@/shared/api/endpoints/banner';

export const mockBanners: BannersDTO = [
  {
    id: 1,
    displayOrder: 1,
    imageUrl: 'https://picsum.photos/seed/banner-comic/1200/400',
    linkUrl: '/event/1',
    title: '코믹월드 2025 서울',
    description:
      '국내 최대 코스프레 문화 행사, 코믹월드가 서울에서 개최됩니다.',
    eventId: 1,
    createdAt: '2025-01-01T00:00:00',
    updatedAt: '2025-01-01T00:00:00',
  },
  {
    id: 2,
    displayOrder: 2,
    imageUrl: 'https://picsum.photos/seed/banner-festa/1200/400',
    linkUrl: '/event/2',
    title: '서울 애니 페스타 2025',
    description:
      '일본 애니메이션 & 코스프레 페스티벌. 100여 팀이 참가하는 대형 행사!',
    eventId: 2,
    createdAt: '2025-01-02T00:00:00',
    updatedAt: '2025-01-02T00:00:00',
  },
  {
    id: 3,
    displayOrder: 3,
    imageUrl: 'https://picsum.photos/seed/banner-cosplay/1200/400',
    linkUrl: '/event/5',
    title: '코스프레 그랜드 챔피언십 2025',
    description: '최고의 코스플레이어를 선발하는 전국 규모 챔피언십!',
    eventId: 5,
    createdAt: '2025-01-03T00:00:00',
    updatedAt: '2025-01-03T00:00:00',
  },
];
