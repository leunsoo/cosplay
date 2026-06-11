import type { SellerProfileDTO } from '@/views/seller-product-list/model/schema/getSellerProfile';
import type { SellerProductsDTO } from '@/views/seller-product-list/model/schema/getSellerProducts';

export const MOCK_SELLER_UUID = 'demo-seller-uuid-0001';

export const mockSellerProfiles: Record<string, SellerProfileDTO> = {
  [MOCK_SELLER_UUID]: {
    uuid: MOCK_SELLER_UUID,
    name: '코스마켓',
    profileImageUrl: 'https://picsum.photos/seed/seller-main/100/100',
    introduction:
      '코스프레 의상 전문 판매자입니다. 직접 제작하거나 1-2회 착용 후 판매합니다. 문의는 채팅으로 주세요!',
  },
  'demo-seller-uuid-0002': {
    uuid: 'demo-seller-uuid-0002',
    name: '애니코스',
    profileImageUrl: null,
    introduction: '애니메이션 코스프레 의상 전문 판매 계정입니다.',
  },
};

export const mockSellerProducts: Record<string, SellerProductsDTO> = {
  [MOCK_SELLER_UUID]: {
    products: [
      {
        id: 1,
        title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
        price: 35000,
        mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
        createdAt: '2025-05-01T00:00:00',
        badges: [{ label: '거래제안가능' }],
      },
      {
        id: 3,
        title: '나루토 코스프레 세트 (나루토 질풍전)',
        price: 42000,
        mainImageUrl: 'https://picsum.photos/seed/prod-naruto/400/400',
        createdAt: '2025-05-05T00:00:00',
        badges: [{ label: '거래제안가능' }, { label: '직거래가능' }],
      },
      {
        id: 5,
        title: '귀멸의 칼날 탄지로 코스프레 의상',
        price: 38000,
        mainImageUrl: 'https://picsum.photos/seed/prod-tanjiro/400/400',
        createdAt: '2025-05-10T00:00:00',
        badges: [],
      },
      {
        id: 7,
        title: '루피 밀짚모자 + 코스프레 의상 (원피스)',
        price: 28000,
        mainImageUrl: 'https://picsum.photos/seed/prod-luffy/400/400',
        createdAt: '2025-05-15T00:00:00',
        badges: [{ label: '직거래가능' }],
      },
      {
        id: 8,
        title: '고죠 사토루 안대 & 교복 (주술회전)',
        price: 32000,
        mainImageUrl: 'https://picsum.photos/seed/prod-gojo/400/400',
        createdAt: '2025-05-18T00:00:00',
        badges: [{ label: '거래제안가능' }],
      },
      {
        id: 11,
        title: '야스오 투구 & 갑옷 소품 세트 (LOL)',
        price: 9500,
        mainImageUrl: 'https://picsum.photos/seed/prod-yasuo/400/400',
        createdAt: '2025-05-25T00:00:00',
        badges: [{ label: '거래제안가능' }],
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalElements: 6,
      pageSize: 8,
      hasNext: false,
      hasPrevious: false,
    },
  },
};
