import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteMeetupStatus } from '@/mocks';

// 개인 행사(모임) 찜 상태 확인 API

export const GetFavoriteMeetupStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  meetupId: z.number().int().positive(),
});
export type GetFavoriteMeetupStatusParams = z.infer<
  typeof GetFavoriteMeetupStatusParamsSchema
>;

export const FavoriteMeetupStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});
export type FavoriteMeetupStatusDTO = z.infer<
  typeof FavoriteMeetupStatusDTOSchema
>;

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
