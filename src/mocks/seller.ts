import type { SellerProfileDTO } from '@/_pages/market/seller-product-list/model/schema/getSellerProfile';
import type { SellerProductsDTO } from '@/_pages/market/seller-product-list/model/schema/getSellerProducts';
import { DEMO_USER_UUID, mockMyProfile } from './user';
import { mockProductList, mockProductDetails } from './product';

export const MOCK_SELLER_UUID = 'demo-seller-uuid-0001';
const OTHER_SELLER_UUID = 'demo-seller-uuid-0002';

// 데모 유저 이외의 고정 판매자 프로필 (상품 자체는 mockProductDetails에서 동적으로 집계)
const staticSellerProfiles: Record<string, Omit<SellerProfileDTO, 'uuid'>> = {
  [MOCK_SELLER_UUID]: {
    name: '코스마켓',
    profileImageUrl: 'https://picsum.photos/seed/seller-main/100/100',
    introduction:
      '코스프레 의상 전문 판매자입니다. 직접 제작하거나 1-2회 착용 후 판매합니다. 문의는 채팅으로 주세요!',
  },
  [OTHER_SELLER_UUID]: {
    name: '애니코스',
    profileImageUrl: null,
    introduction: '애니메이션 코스프레 의상 전문 판매 계정입니다.',
  },
};

export function getDemoSellerProfile(sellerUuid: string): SellerProfileDTO {
  if (sellerUuid === DEMO_USER_UUID) {
    return {
      uuid: DEMO_USER_UUID,
      name: mockMyProfile.nickname ?? '데모유저',
      profileImageUrl: mockMyProfile.profileImageUri ?? null,
      introduction: mockMyProfile.introduction ?? null,
    };
  }

  const staticProfile = staticSellerProfiles[sellerUuid];
  if (staticProfile) return { uuid: sellerUuid, ...staticProfile };

  // 알 수 없는 판매자는 코스마켓으로 폴백
  return { uuid: MOCK_SELLER_UUID, ...staticSellerProfiles[MOCK_SELLER_UUID] };
}

export function getDemoSellerProducts(
  sellerUuid: string,
  page = 1,
  size = 8
): SellerProductsDTO {
  const sellerProductIds = new Set(
    Object.values(mockProductDetails)
      .filter((detail) => detail.seller.uuid === sellerUuid)
      .map((detail) => detail.product.id)
  );

  const allProducts = mockProductList.products.filter((product) =>
    sellerProductIds.has(product.id)
  );

  const totalElements = allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const start = (page - 1) * size;
  const products = allProducts.slice(start, start + size);

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalElements,
      pageSize: size,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}
