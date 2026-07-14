import type { ProductListDTO } from '@/entities/product/model';
import type { ProductDetailResponseDTO } from '@/entities/product/model/schema/getProductDetail';
import type { ProductSearchDTO } from '@/entities/product/model/schema/getProductSearch';
import type { CreateProductBody } from '@/entities/product/model/schema/createProduct';
import type { UpdateProductBody } from '@/entities/product/model/schema/updateProduct';
import { DEMO_USER_UUID, mockMyProfile } from './user';

const SELLER_UUID = 'demo-seller-uuid-0001';

export const mockProductList: ProductListDTO = {
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
      id: 2,
      title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
      price: 58000,
      mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
      createdAt: '2025-05-03T00:00:00',
      badges: [{ label: '배송비포함' }],
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
      id: 4,
      title: '아리 코스프레 의상 (리그 오브 레전드)',
      price: 65000,
      mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
      createdAt: '2025-05-08T00:00:00',
      badges: [{ label: '배송비포함' }],
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
      id: 6,
      title: '세일러문 변신 봉 소품 세트',
      price: 18000,
      mainImageUrl: 'https://picsum.photos/seed/prod-sailor/400/400',
      createdAt: '2025-05-12T00:00:00',
      badges: [{ label: '거래제안가능' }],
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
      id: 9,
      title: '히나타 쇼요 카라스노 배구부 유니폼 (하이큐)',
      price: 22000,
      mainImageUrl: 'https://picsum.photos/seed/prod-hinata/400/400',
      createdAt: '2025-05-20T00:00:00',
      badges: [],
    },
    {
      id: 10,
      title: '모아나 코스프레 드레스 세트',
      price: 45000,
      mainImageUrl: 'https://picsum.photos/seed/prod-moana/400/400',
      createdAt: '2025-05-22T00:00:00',
      badges: [{ label: '배송비포함' }],
    },
    {
      id: 11,
      title: '야스오 투구 & 갑옷 소품 세트 (LOL)',
      price: 9500,
      mainImageUrl: 'https://picsum.photos/seed/prod-yasuo/400/400',
      createdAt: '2025-05-25T00:00:00',
      badges: [{ label: '거래제안가능' }],
    },
    {
      id: 12,
      title: '스파이더맨 홀랜드 바디슈트 (마블)',
      price: 55000,
      mainImageUrl: 'https://picsum.photos/seed/prod-spiderman/400/400',
      createdAt: '2025-05-28T00:00:00',
      badges: [{ label: '배송비포함' }, { label: '거래제안가능' }],
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalElements: 12,
    pageSize: 12,
    hasNext: false,
    hasPrevious: false,
  },
};

export const mockProductDetails: Record<number, ProductDetailResponseDTO> = {
  1: {
    product: {
      id: 1,
      title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
      price: 35000,
      description:
        '<p>진격의 거인 에렌 예거 조사병단 의상 세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>상의 (갈색 재킷)</p></li><li><p>하의 (베이지 바지)</p></li><li><p>흰 셔츠</p></li><li><p>입체기동장치 벨트 (소품)</p></li></ul><p><strong>사이즈</strong>: M (남성 기준, 키 170-175cm 착용 가능)</p><p><strong>상태</strong>: 2회 착용, 세탁 완료, 파손 없음</p><p>직거래 가능 (서울 강남).</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
      status: 'SELLING',
      shippingType: 'BOTH',
      standardShipping: 3000,
      economyShippingAvailable: false,
      directTradeEnabled: true,
      directTradeLocation: '서울특별시 강남구',
      directTradePlace: '강남역 근처',
      priceNegotiable: true,
      viewCount: 142,
      favoriteCount: 18,
      deliveryMethod: '택배 또는 직거래',
      createdAt: '2025-05-01T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 3,
        title: '나루토 코스프레 세트 (나루토 질풍전)',
        price: 42000,
        mainImageUrl: 'https://picsum.photos/seed/prod-naruto/400/400',
        createdAt: '2025-05-05T00:00:00',
        status: 'SELLING',
      },
      {
        id: 5,
        title: '귀멸의 칼날 탄지로 코스프레 의상',
        price: 38000,
        mainImageUrl: 'https://picsum.photos/seed/prod-tanjiro/400/400',
        createdAt: '2025-05-10T00:00:00',
        status: 'SELLING',
      },
      {
        id: 7,
        title: '루피 밀짚모자 + 코스프레 의상 (원피스)',
        price: 28000,
        mainImageUrl: 'https://picsum.photos/seed/prod-luffy/400/400',
        createdAt: '2025-05-15T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  2: {
    product: {
      id: 2,
      title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
      price: 58000,
      description:
        '<p>다링 인 더 프랑스 제로투 공주 드레스 풀세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>빨간 드레스 (원피스형)</p></li><li><p>흰 장갑</p></li><li><p>뿔 헤어밴드</p></li><li><p>프릴 스타킹</p></li></ul><p><strong>사이즈</strong>: S/M 겸용, 허리 조절 가능</p><p><strong>상태</strong>: 1회 착용, 세탁 완료, 양호</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: false,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: false,
      viewCount: 238,
      favoriteCount: 45,
      deliveryMethod: '택배',
      createdAt: '2025-05-03T00:00:00',
    },
    seller: {
      uuid: 'demo-seller-uuid-0002',
      name: '애니코스',
      avatar: null,
    },
    sellerOtherProducts: [
      {
        id: 4,
        title: '아리 코스프레 의상 (리그 오브 레전드)',
        price: 65000,
        mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
        createdAt: '2025-05-08T00:00:00',
        status: 'SELLING',
      },
    ],
  },
};

export const mockProductSearch: ProductSearchDTO = {
  products: mockProductList.products.slice(0, 6).map((p) => ({ ...p })),
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalElements: 6,
    pageSize: 10,
    hasNext: false,
    hasPrevious: false,
  },
};

function getNextDemoProductId(): number {
  const ids = mockProductList.products.map((product) => product.id);
  return (ids.length > 0 ? Math.max(...ids) : 0) + 1;
}

export function createDemoProduct(body: CreateProductBody): {
  id: number;
  title: string;
  price: number;
  status: string;
  createdAt: string;
} {
  const id = getNextDemoProductId();
  const now = new Date().toISOString();

  const detail: ProductDetailResponseDTO = {
    product: {
      id,
      title: body.title,
      price: body.price,
      description: body.description,
      mainImageUrl: body.mainImageUrl,
      status: 'SELLING',
      shippingType: body.shippingType === 'included' ? 'DELIVERY' : 'BOTH',
      standardShipping: body.standardShipping,
      economyShippingAvailable: false,
      directTradeEnabled: body.directTradeEnabled === 'possible',
      directTradeLocation: body.directTradeLocation || null,
      directTradePlace: body.directTradePlace || null,
      priceNegotiable: body.priceNegotiable,
      viewCount: 0,
      favoriteCount: 0,
      deliveryMethod:
        body.directTradeEnabled === 'possible' ? '택배 또는 직거래' : '택배',
      createdAt: now,
    },
    seller: {
      uuid: DEMO_USER_UUID,
      name: mockMyProfile.nickname ?? '데모유저',
      avatar: mockMyProfile.profileImageUri ?? null,
    },
    sellerOtherProducts: [],
  };

  mockProductDetails[id] = detail;
  mockProductList.products.unshift({
    id,
    title: detail.product.title,
    price: detail.product.price,
    mainImageUrl: detail.product.mainImageUrl,
    createdAt: detail.product.createdAt,
    badges: [],
  });
  mockProductList.pagination.totalElements += 1;

  return {
    id,
    title: detail.product.title,
    price: detail.product.price,
    status: detail.product.status,
    createdAt: now,
  };
}

export function updateDemoProduct(
  productId: number,
  body: UpdateProductBody
): {
  id: number;
  title: string;
  price: number;
  status: string;
  updatedAt: string;
} {
  const existing = mockProductDetails[productId];
  const now = new Date().toISOString();
  const status = existing?.product.status ?? 'SELLING';

  if (existing) {
    mockProductDetails[productId] = {
      ...existing,
      product: {
        ...existing.product,
        title: body.title,
        price: body.price,
        description: body.description,
        mainImageUrl: body.mainImageUrl,
        priceNegotiable: body.priceNegotiable,
        shippingType: body.shippingType === 'included' ? 'DELIVERY' : 'BOTH',
        standardShipping: body.standardShipping,
        directTradeEnabled: body.directTradeEnabled === 'possible',
        directTradeLocation: body.directTradeLocation || null,
        directTradePlace: body.directTradePlace || null,
      },
    };
  }

  const listIndex = mockProductList.products.findIndex(
    (p) => p.id === productId
  );
  if (listIndex !== -1) {
    mockProductList.products[listIndex] = {
      ...mockProductList.products[listIndex],
      title: body.title,
      price: body.price,
      mainImageUrl: body.mainImageUrl,
    };
  }

  return {
    id: productId,
    title: body.title,
    price: body.price,
    status,
    updatedAt: now,
  };
}

export function deleteDemoProduct(productId: number): {
  productId: number;
  status: string;
} {
  delete mockProductDetails[productId];

  const listIndex = mockProductList.products.findIndex(
    (p) => p.id === productId
  );
  if (listIndex !== -1) {
    mockProductList.products.splice(listIndex, 1);
    mockProductList.pagination.totalElements -= 1;
  }

  return { productId, status: 'DELETED' };
}

export function updateDemoProductStatus(
  productId: number,
  status: 'SELLING' | 'RESERVED' | 'SOLD'
): { productId: number; status: string; updatedAt: string } {
  const existing = mockProductDetails[productId];
  const updatedAt = new Date().toISOString();

  if (existing) {
    mockProductDetails[productId] = {
      ...existing,
      product: { ...existing.product, status },
    };
  }

  return { productId, status, updatedAt };
}
