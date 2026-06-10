// 최근 본 상품 목록 조회
export {
  GetRecentlyViewedListParamsSchema,
  RecentlyViewedListDTOSchema,
  type GetRecentlyViewedListParams,
  type RecentlyViewedListDTO,
} from './getRecentlyViewedList';

// 상품 기록 추가
export {
  AddRecentlyViewedBodySchema,
  type AddRecentlyViewedBody,
} from './addRecentlyViewed';

// 최근 본 상품 기록 전체 삭제
export {
  DeleteAllRecentlyViewedParamsSchema,
  DeleteAllRecentlyViewedDTOSchema,
  type DeleteAllRecentlyViewedParams,
  type DeleteAllRecentlyViewedDTO,
} from './deleteAllRecentlyViewed';
