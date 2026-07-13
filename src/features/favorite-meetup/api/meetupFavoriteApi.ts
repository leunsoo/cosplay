import { apiClient, type ApiResponse } from '@/shared/api';
import {
  FavoriteMeetupListDTOSchema,
  GetFavoriteMeetupListParamsSchema,
  type GetFavoriteMeetupListParams,
  type FavoriteMeetupListDTO,
  FavoriteMeetupStatusDTOSchema,
  GetFavoriteMeetupStatusParamsSchema,
  type GetFavoriteMeetupStatusParams,
  type FavoriteMeetupStatusDTO,
  AddFavoriteMeetupParamsSchema,
  AddFavoriteMeetupBodySchema,
  type AddFavoriteMeetupParams,
  type AddFavoriteMeetupBody,
  DeleteFavoriteMeetupParamsSchema,
  type DeleteFavoriteMeetupParams,
  FavoriteMeetupActionResponseSchema,
  type FavoriteMeetupActionResponse,
} from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  getDemoFavoriteMeetupList,
  getDemoFavoriteMeetupStatus,
  addDemoFavoriteMeetup,
  removeDemoFavoriteMeetup,
} from '@/mocks';

export const getFavoriteMeetupList = async (
  params: GetFavoriteMeetupListParams
): Promise<ApiResponse<FavoriteMeetupListDTO>> => {
  const validatedParams = GetFavoriteMeetupListParamsSchema.parse(params);
  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteMeetupList(),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-meetups`,
    FavoriteMeetupListDTOSchema
  );
};

export const getFavoriteMeetupStatus = async (
  params: GetFavoriteMeetupStatusParams
): Promise<ApiResponse<FavoriteMeetupStatusDTO>> => {
  const validatedParams = GetFavoriteMeetupStatusParamsSchema.parse(params);
  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteMeetupStatus(validatedParams.meetupId),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-meetups/${validatedParams.meetupId}/status`,
    FavoriteMeetupStatusDTOSchema
  );
};

export const addFavoriteMeetup = async (
  params: AddFavoriteMeetupParams,
  body: AddFavoriteMeetupBody
): Promise<ApiResponse<FavoriteMeetupActionResponse>> => {
  const validatedParams = AddFavoriteMeetupParamsSchema.parse(params);
  const validatedBody = AddFavoriteMeetupBodySchema.parse(body);

  if (IS_DEMO) {
    addDemoFavoriteMeetup(validatedBody.meetupId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteMeetupList().totalCount,
      },
    };
  }

  return apiClient.postWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-meetups`,
    FavoriteMeetupActionResponseSchema,
    validatedBody
  );
};

export const deleteFavoriteMeetup = async (
  params: DeleteFavoriteMeetupParams
): Promise<ApiResponse<FavoriteMeetupActionResponse>> => {
  const validatedParams = DeleteFavoriteMeetupParamsSchema.parse(params);

  if (IS_DEMO) {
    removeDemoFavoriteMeetup(validatedParams.meetupId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteMeetupList().totalCount,
      },
    };
  }

  return apiClient.deleteWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-meetups/${validatedParams.meetupId}`,
    FavoriteMeetupActionResponseSchema
  );
};
