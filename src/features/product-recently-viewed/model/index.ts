// 최근 본 상품 목록 조회
export {
  GetRecentlyViewedListParamsSchema,
  RecentlyViewedListDTOSchema,
  type GetRecentlyViewedListParams,
  type RecentlyViewedListDTO,
} from './schema';

// 상품 기록 추가
export {
  AddRecentlyViewedBodySchema,
  type AddRecentlyViewedBody,
} from './schema';

// 최근 본 상품 기록 전체 삭제
export {
  DeleteAllRecentlyViewedParamsSchema,
  DeleteAllRecentlyViewedDTOSchema,
  type DeleteAllRecentlyViewedParams,
  type DeleteAllRecentlyViewedDTO,
} from './schema';

export {
  useRecentlyViewedList,
  useDeleteAllRecentlyViewed,
  useAddRecentlyViewed,
} from './hooks';
