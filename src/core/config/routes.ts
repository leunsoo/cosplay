/**
 * 애플리케이션 라우트 경로 상수
 * 모든 페이지 경로를 중앙에서 관리
 */
export const ROUTES = {
  // 메인
  HOME: '/event',

  // 로그인
  LOGIN: '/login',
  // 회원가입
  REGISTER: '/register',
  // 내 정보
  MY_INFO: '/my-info',

  // 마켓
  MARKET: '/market',
  // 채팅
  CHAT: '/market/chat',

  // 상품
  PRODUCT: {
    DETAIL: (id: string | number) => `/market/products/${id}`,
    REGISTER: '/market/products/regist',
    MANAGE: '/market/products/manage',
  },

  // 판매자
  SELLER: {
    SHOP: (id: string | number) => `/market/seller/${id}`,
    PRODUCTS: (id: string | number) => `/market/seller/${id}/products`,
  },

  // 이벤트
  EVENT: {
    DETAIL: (eventId: string | number) => `/event/${eventId}`,
    REGISTER: '/meetup/register',
  },

  // 밋업
  MEETUP: {
    DETAIL: (meetupId: string | number) => `/meetup/${meetupId}`,
    EDIT: (meetupId: string | number) => `/meetup/${meetupId}/edit`,
  },

  // 커뮤니티
  COMMUNITY: {
    LIST: '/community',
    NOTICE_DETAIL: (id: string | number) => `/community/notice/${id}`,
    QNA_DETAIL: (id: string | number) => `/community/qna/${id}`,
    WRITE: '/community/write',
  },
} as const;
