// 찜한 행사 목록 조회
export {
  GetFavoriteEventListParamsSchema,
  FavoriteEventListDTOSchema,
  type GetFavoriteEventListParams,
  type FavoriteEventListDTO,
} from './schema/getFavoriteEventList';

// 행사 찜 상태 확인
export {
  GetFavoriteEventStatusParamsSchema,
  FavoriteEventStatusDTOSchema,
  type GetFavoriteEventStatusParams,
  type FavoriteEventStatusDTO,
} from './schema/getFavoriteEventStatus';

// 행사 찜하기
export {
  AddFavoriteEventParamsSchema,
  AddFavoriteEventBodySchema,
  type AddFavoriteEventParams,
  type AddFavoriteEventBody,
} from './schema/addFavoriteEvent';

// 행사 찜하기 취소
export {
  DeleteFavoriteEventParamsSchema,
  type DeleteFavoriteEventParams,
} from './schema/deleteFavoriteEvent';

// 행사 찜하기/찜하기 취소 응답
export {
  FavoriteEventActionResponseSchema,
  type FavoriteEventActionResponse,
} from './schema/favoriteEventActionResponse';

export { useEventFavoriteToggle, useEventFavoriteList } from './hooks';
