// 찜한 상품 목록 조회
export {
  GetFavoriteListParamsSchema,
  FavoriteListDTOSchema,
  type GetFavoriteListParams,
  type FavoriteListDTO,
} from './getFavoriteList';

// 찜 상태 조회
export {
  GetFavoriteStatusParamsSchema,
  FavoriteStatusDTOSchema,
  type GetFavoriteStatusParams,
  type FavoriteStatusDTO,
} from './getFavoriteStatus';

// 상품 찜하기
export {
  AddFavoriteParamsSchema,
  AddFavoriteBodySchema,
  type AddFavoriteParams,
  type AddFavoriteBody,
} from './addFavorite';

// 찜하기 취소
export {
  DeleteFavoriteParamsSchema,
  type DeleteFavoriteParams,
} from './deleteFavorite';

// 찜하기/찜하기 취소 응답
export {
  FavoriteActionResponseSchema,
  type FavoriteActionResponse,
} from './favoriteActionResponse';
