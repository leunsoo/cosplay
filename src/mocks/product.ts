import type { ProductListDTO } from '@/_pages/market/product-list/api/get-product-list';
import type { ProductDetailResponseDTO } from '@/entities/product';
import type { CreateProductBody } from '@/_pages/market/product-regist/api/create-product';
import type { UpdateProductBody } from '@/_pages/market/product-regist/api/update-product';
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
      {
        id: 6,
        title: '세일러문 변신 봉 소품 세트',
        price: 18000,
        mainImageUrl: 'https://picsum.photos/seed/prod-sailor/400/400',
        createdAt: '2025-05-12T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  3: {
    product: {
      id: 3,
      title: '나루토 코스프레 세트 (나루토 질풍전)',
      price: 42000,
      description:
        '<p>나루토 우즈마키 질풍전 버전 코스프레 세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>주황/검정 재킷</p></li><li><p>이마 헤드밴드</p></li><li><p>쿠나이 파우치 (소품)</p></li></ul><p><strong>사이즈</strong>: M (170cm 전후 착용 권장)</p><p><strong>상태</strong>: 3회 착용, 세탁 완료</p><p>직거래 시 사진으로 상태 미리 확인 가능합니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-naruto/400/400',
      status: 'SELLING',
      shippingType: 'BOTH',
      standardShipping: 3000,
      economyShippingAvailable: true,
      directTradeEnabled: true,
      directTradeLocation: '서울특별시 강남구',
      directTradePlace: '강남역 근처',
      priceNegotiable: true,
      viewCount: 97,
      favoriteCount: 11,
      deliveryMethod: '택배 또는 직거래',
      createdAt: '2025-05-05T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 1,
        title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
        price: 35000,
        mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
        createdAt: '2025-05-01T00:00:00',
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
  4: {
    product: {
      id: 4,
      title: '아리 코스프레 의상 (리그 오브 레전드)',
      price: 65000,
      description:
        '<p>리그 오브 레전드 아리 기본 스킨 코스프레 의상입니다.</p><p><strong>구성품</strong></p><ul><li><p>차이나풍 원피스</p></li><li><p>꼬리 소품 9개 세트</p></li><li><p>헤어 장식</p></li></ul><p><strong>사이즈</strong>: S/M 겸용</p><p><strong>상태</strong>: 미착용 새상품</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: false,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: false,
      viewCount: 312,
      favoriteCount: 58,
      deliveryMethod: '택배',
      createdAt: '2025-05-08T00:00:00',
    },
    seller: {
      uuid: 'demo-seller-uuid-0002',
      name: '애니코스',
      avatar: null,
    },
    sellerOtherProducts: [
      {
        id: 2,
        title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
        price: 58000,
        mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
        createdAt: '2025-05-03T00:00:00',
        status: 'SELLING',
      },
      {
        id: 6,
        title: '세일러문 변신 봉 소품 세트',
        price: 18000,
        mainImageUrl: 'https://picsum.photos/seed/prod-sailor/400/400',
        createdAt: '2025-05-12T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  5: {
    product: {
      id: 5,
      title: '귀멸의 칼날 탄지로 코스프레 의상',
      price: 38000,
      description:
        '<p>귀멸의 칼날 카마도 탄지로 하오리 코스프레 의상입니다.</p><p><strong>구성품</strong></p><ul><li><p>초록/검정 체크 하오리</p></li><li><p>검정 교복형 의상</p></li><li><p>이마 흉터 스티커</p></li></ul><p><strong>사이즈</strong>: M</p><p><strong>상태</strong>: 1회 착용, 세탁 완료</p><p>직거래 가능(강남역).</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-tanjiro/400/400',
      status: 'SELLING',
      shippingType: 'BOTH',
      standardShipping: 3000,
      economyShippingAvailable: false,
      directTradeEnabled: true,
      directTradeLocation: '서울특별시 강남구',
      directTradePlace: '강남역 근처',
      priceNegotiable: true,
      viewCount: 156,
      favoriteCount: 23,
      deliveryMethod: '택배 또는 직거래',
      createdAt: '2025-05-10T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 1,
        title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
        price: 35000,
        mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
        createdAt: '2025-05-01T00:00:00',
        status: 'SELLING',
      },
      {
        id: 3,
        title: '나루토 코스프레 세트 (나루토 질풍전)',
        price: 42000,
        mainImageUrl: 'https://picsum.photos/seed/prod-naruto/400/400',
        createdAt: '2025-05-05T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  6: {
    product: {
      id: 6,
      title: '세일러문 변신 봉 소품 세트',
      price: 18000,
      description:
        '<p>세일러문 변신 봉(문 스틱) 소품 세트입니다. 의상은 포함되어 있지 않습니다.</p><p><strong>구성품</strong></p><ul><li><p>변신 봉 1개</p></li><li><p>발광 이펙트 스티커</p></li></ul><p><strong>상태</strong>: 미개봉 새상품</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-sailor/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: true,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: false,
      viewCount: 64,
      favoriteCount: 7,
      deliveryMethod: '택배',
      createdAt: '2025-05-12T00:00:00',
    },
    seller: {
      uuid: 'demo-seller-uuid-0002',
      name: '애니코스',
      avatar: null,
    },
    sellerOtherProducts: [
      {
        id: 2,
        title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
        price: 58000,
        mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
        createdAt: '2025-05-03T00:00:00',
        status: 'SELLING',
      },
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
  7: {
    product: {
      id: 7,
      title: '루피 밀짚모자 + 코스프레 의상 (원피스)',
      price: 28000,
      description:
        '<p>원피스 몽키 D. 루피 코스프레 의상 및 밀짚모자 세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>빨간 조끼</p></li><li><p>파란 반바지</p></li><li><p>밀짚모자</p></li><li><p>샌들 (프리사이즈)</p></li></ul><p><strong>사이즈</strong>: M</p><p><strong>상태</strong>: 2회 착용, 세탁 완료</p><p>직거래 가능(강남역).</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-luffy/400/400',
      status: 'SELLING',
      shippingType: 'BOTH',
      standardShipping: 3000,
      economyShippingAvailable: false,
      directTradeEnabled: true,
      directTradeLocation: '서울특별시 강남구',
      directTradePlace: '강남역 근처',
      priceNegotiable: true,
      viewCount: 121,
      favoriteCount: 15,
      deliveryMethod: '택배 또는 직거래',
      createdAt: '2025-05-15T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 1,
        title: '에렌 예거 코스프레 의상 세트 (진격의 거인)',
        price: 35000,
        mainImageUrl: 'https://picsum.photos/seed/prod-eren/400/400',
        createdAt: '2025-05-01T00:00:00',
        status: 'SELLING',
      },
      {
        id: 3,
        title: '나루토 코스프레 세트 (나루토 질풍전)',
        price: 42000,
        mainImageUrl: 'https://picsum.photos/seed/prod-naruto/400/400',
        createdAt: '2025-05-05T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  8: {
    product: {
      id: 8,
      title: '고죠 사토루 안대 & 교복 (주술회전)',
      price: 32000,
      description:
        '<p>주술회전 고죠 사토루 교복 코스프레 의상 및 안대 세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>검정 교복 재킷</p></li><li><p>흰 셔츠</p></li><li><p>안대</p></li></ul><p><strong>사이즈</strong>: L (180cm 전후 착용 권장)</p><p><strong>상태</strong>: 1회 착용, 세탁 완료</p><p>배송비 별도입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-gojo/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 3000,
      economyShippingAvailable: false,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: true,
      viewCount: 203,
      favoriteCount: 34,
      deliveryMethod: '택배',
      createdAt: '2025-05-18T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 9,
        title: '히나타 쇼요 카라스노 배구부 유니폼 (하이큐)',
        price: 22000,
        mainImageUrl: 'https://picsum.photos/seed/prod-hinata/400/400',
        createdAt: '2025-05-20T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  9: {
    product: {
      id: 9,
      title: '히나타 쇼요 카라스노 배구부 유니폼 (하이큐)',
      price: 22000,
      description:
        '<p>하이큐 카라스노 고교 배구부 유니폼(9번, 히나타 쇼요)입니다.</p><p><strong>구성품</strong></p><ul><li><p>검정/주황 유니폼 상의</p></li><li><p>검정 반바지</p></li></ul><p><strong>사이즈</strong>: M</p><p><strong>상태</strong>: 세탁 완료, 양호</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-hinata/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: true,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: false,
      viewCount: 88,
      favoriteCount: 9,
      deliveryMethod: '택배',
      createdAt: '2025-05-20T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 8,
        title: '고죠 사토루 안대 & 교복 (주술회전)',
        price: 32000,
        mainImageUrl: 'https://picsum.photos/seed/prod-gojo/400/400',
        createdAt: '2025-05-18T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  10: {
    product: {
      id: 10,
      title: '모아나 코스프레 드레스 세트',
      price: 45000,
      description:
        '<p>디즈니 모아나 코스프레 드레스 세트입니다.</p><p><strong>구성품</strong></p><ul><li><p>레드/화이트 드레스</p></li><li><p>조개 목걸이 소품</p></li></ul><p><strong>사이즈</strong>: S/M 겸용</p><p><strong>상태</strong>: 미착용 새상품</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-moana/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: false,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: false,
      viewCount: 74,
      favoriteCount: 12,
      deliveryMethod: '택배',
      createdAt: '2025-05-22T00:00:00',
    },
    seller: {
      uuid: 'demo-seller-uuid-0002',
      name: '애니코스',
      avatar: null,
    },
    sellerOtherProducts: [
      {
        id: 12,
        title: '스파이더맨 홀랜드 바디슈트 (마블)',
        price: 55000,
        mainImageUrl: 'https://picsum.photos/seed/prod-spiderman/400/400',
        createdAt: '2025-05-28T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  11: {
    product: {
      id: 11,
      title: '야스오 투구 & 갑옷 소품 세트 (LOL)',
      price: 9500,
      description:
        '<p>리그 오브 레전드 야스오 투구 및 어깨 갑옷 소품 세트입니다. 의상은 포함되어 있지 않습니다.</p><p><strong>구성품</strong></p><ul><li><p>투구 1개</p></li><li><p>어깨 갑옷 1쌍</p></li></ul><p><strong>상태</strong>: 1회 착용, 양호</p><p>직거래 가능(강남역).</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-yasuo/400/400',
      status: 'SELLING',
      shippingType: 'BOTH',
      standardShipping: 3000,
      economyShippingAvailable: true,
      directTradeEnabled: true,
      directTradeLocation: '서울특별시 강남구',
      directTradePlace: '강남역 근처',
      priceNegotiable: true,
      viewCount: 41,
      favoriteCount: 5,
      deliveryMethod: '택배 또는 직거래',
      createdAt: '2025-05-25T00:00:00',
    },
    seller: {
      uuid: SELLER_UUID,
      name: '코스마켓',
      avatar: 'https://picsum.photos/seed/seller-main/100/100',
    },
    sellerOtherProducts: [
      {
        id: 8,
        title: '고죠 사토루 안대 & 교복 (주술회전)',
        price: 32000,
        mainImageUrl: 'https://picsum.photos/seed/prod-gojo/400/400',
        createdAt: '2025-05-18T00:00:00',
        status: 'SELLING',
      },
    ],
  },
  12: {
    product: {
      id: 12,
      title: '스파이더맨 홀랜드 바디슈트 (마블)',
      price: 55000,
      description:
        '<p>마블 스파이더맨(톰 홀랜드 버전) 바디슈트입니다.</p><p><strong>구성품</strong></p><ul><li><p>전신 바디슈트</p></li><li><p>이너 마스크</p></li></ul><p><strong>사이즈</strong>: M (170-178cm 착용 권장)</p><p><strong>상태</strong>: 2회 착용, 세탁 완료</p><p>배송비 포함 가격입니다.</p>',
      mainImageUrl: 'https://picsum.photos/seed/prod-spiderman/400/400',
      status: 'SELLING',
      shippingType: 'DELIVERY',
      standardShipping: 0,
      economyShippingAvailable: false,
      directTradeEnabled: false,
      directTradeLocation: null,
      directTradePlace: null,
      priceNegotiable: true,
      viewCount: 189,
      favoriteCount: 27,
      deliveryMethod: '택배',
      createdAt: '2025-05-28T00:00:00',
    },
    seller: {
      uuid: 'demo-seller-uuid-0002',
      name: '애니코스',
      avatar: null,
    },
    sellerOtherProducts: [
      {
        id: 10,
        title: '모아나 코스프레 드레스 세트',
        price: 45000,
        mainImageUrl: 'https://picsum.photos/seed/prod-moana/400/400',
        createdAt: '2025-05-22T00:00:00',
        status: 'SELLING',
      },
    ],
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
