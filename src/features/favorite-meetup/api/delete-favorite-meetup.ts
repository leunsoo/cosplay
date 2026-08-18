import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { removeDemoFavoriteMeetup, getDemoFavoriteMeetupList } from '@/mocks';
import {
  FavoriteMeetupActionResponseSchema,
  type FavoriteMeetupActionResponse,
} from './add-favorite-meetup';

// 개인 행사(모임) 찜하기 취소 API

export const DeleteFavoriteMeetupParamsSchema = z.object({
  uuid: z.string().min(1),
  meetupId: z.number().int().positive(),
});
export type DeleteFavoriteMeetupParams = z.infer<
  typeof DeleteFavoriteMeetupParamsSchema
>;

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
