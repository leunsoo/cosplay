import { apiClient, type ApiResponse } from '@/shared/api';
import {
  FavoriteEventListDTOSchema,
  GetFavoriteEventListParamsSchema,
  type GetFavoriteEventListParams,
  type FavoriteEventListDTO,
  FavoriteEventStatusDTOSchema,
  GetFavoriteEventStatusParamsSchema,
  type GetFavoriteEventStatusParams,
  type FavoriteEventStatusDTO,
  AddFavoriteEventParamsSchema,
  AddFavoriteEventBodySchema,
  type AddFavoriteEventParams,
  type AddFavoriteEventBody,
  DeleteFavoriteEventParamsSchema,
  type DeleteFavoriteEventParams,
  FavoriteEventActionResponseSchema,
  type FavoriteEventActionResponse,
} from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  getDemoFavoriteEventList,
  getDemoFavoriteEventStatus,
  addDemoFavoriteEvent,
  removeDemoFavoriteEvent,
} from '@/mocks/favorite';

/**
 * 찜한 행사 목록 조회 API
 *
 * @param params - uuid (path parameter)
 * @returns 찜한 행사 목록 및 총 개수
 *
 * @example
 * ```ts
 * const response = await getFavoriteEventList({ uuid: 'user-uuid' });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getFavoriteEventList = async (
  params: GetFavoriteEventListParams
): Promise<ApiResponse<FavoriteEventListDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetFavoriteEventListParamsSchema.parse(params);

  // API 호출 및 응답 검증
  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteEventList(),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events`,
    FavoriteEventListDTOSchema
  );
};

/**
 * 행사 찜 상태 확인 API
 *
 * @param params - uuid, eventId (path parameters)
 * @returns 찜 여부
 *
 * @example
 * ```ts
 * const response = await getFavoriteEventStatus({ uuid: 'user-uuid', eventId: 1 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않거나 백엔드 응답이 예상과 다를 경우
 */
export const getFavoriteEventStatus = async (
  params: GetFavoriteEventStatusParams
): Promise<ApiResponse<FavoriteEventStatusDTO>> => {
  // 요청 파라미터 검증
  const validatedParams = GetFavoriteEventStatusParamsSchema.parse(params);

  // API 호출 및 응답 검증
  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteEventStatus(validatedParams.eventId),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events/${validatedParams.eventId}/status`,
    FavoriteEventStatusDTOSchema
  );
};

/**
 * 행사 찜하기 API
 *
 * @param params - uuid (path parameter)
 * @param body - eventId
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await addFavoriteEvent({ uuid: 'user-uuid' }, { eventId: 1 });
 * ```
 *
 * @throws {ZodError} 요청이 유효하지 않을 경우
 */
export const addFavoriteEvent = async (
  params: AddFavoriteEventParams,
  body: AddFavoriteEventBody
): Promise<ApiResponse<FavoriteEventActionResponse>> => {
  // 요청 파라미터 및 바디 검증
  const validatedParams = AddFavoriteEventParamsSchema.parse(params);
  const validatedBody = AddFavoriteEventBodySchema.parse(body);

  if (IS_DEMO) {
    addDemoFavoriteEvent(validatedBody.eventId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteEventList().totalCount,
      },
    };
  }

  // API 호출 및 응답 검증
  return apiClient.postWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events`,
    FavoriteEventActionResponseSchema,
    validatedBody
  );
};

/**
 * 행사 찜하기 취소 API
 *
 * @param params - uuid, eventId (path parameters)
 * @returns API 응답
 *
 * @example
 * ```ts
 * const response = await deleteFavoriteEvent({ uuid: 'user-uuid', eventId: 1 });
 * ```
 *
 * @throws {ZodError} 파라미터가 유효하지 않을 경우
 */
export const deleteFavoriteEvent = async (
  params: DeleteFavoriteEventParams
): Promise<ApiResponse<FavoriteEventActionResponse>> => {
  // 요청 파라미터 검증
  const validatedParams = DeleteFavoriteEventParamsSchema.parse(params);

  if (IS_DEMO) {
    removeDemoFavoriteEvent(validatedParams.eventId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteEventList().totalCount,
      },
    };
  }

  // API 호출 및 응답 검증
  return apiClient.deleteWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events/${validatedParams.eventId}`,
    FavoriteEventActionResponseSchema
  );
};
