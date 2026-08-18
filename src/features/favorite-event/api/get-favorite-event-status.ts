import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteEventStatus } from '@/mocks';

// 행사 찜 상태 확인 API

export const GetFavoriteEventStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  eventId: z.number().int().positive(),
});
export type GetFavoriteEventStatusParams = z.infer<
  typeof GetFavoriteEventStatusParamsSchema
>;

export const FavoriteEventStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});
export type FavoriteEventStatusDTO = z.infer<
  typeof FavoriteEventStatusDTOSchema
>;

export const getFavoriteEventStatus = async (
  params: GetFavoriteEventStatusParams
): Promise<ApiResponse<FavoriteEventStatusDTO>> => {
  const validatedParams = GetFavoriteEventStatusParamsSchema.parse(params);

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
