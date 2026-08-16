import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { removeDemoFavoriteEvent, getDemoFavoriteEventList } from '@/mocks';
import {
  FavoriteEventActionResponseSchema,
  type FavoriteEventActionResponse,
} from './add-favorite-event';

// 행사 찜하기 취소 API

export const DeleteFavoriteEventParamsSchema = z.object({
  uuid: z.string().min(1),
  eventId: z.number().int().positive(),
});
export type DeleteFavoriteEventParams = z.infer<
  typeof DeleteFavoriteEventParamsSchema
>;

export const deleteFavoriteEvent = async (
  params: DeleteFavoriteEventParams
): Promise<ApiResponse<FavoriteEventActionResponse>> => {
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

  return apiClient.deleteWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events/${validatedParams.eventId}`,
    FavoriteEventActionResponseSchema
  );
};
