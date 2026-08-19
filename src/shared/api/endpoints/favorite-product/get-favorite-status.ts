import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteStatus } from '@/mocks';

// 찜 상태 조회 API

export const GetFavoriteStatusParamsSchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});
export type GetFavoriteStatusParams = z.infer<
  typeof GetFavoriteStatusParamsSchema
>;

export const FavoriteStatusDTOSchema = z.object({
  isFavorited: z.boolean(),
});
export type FavoriteStatusDTO = z.infer<typeof FavoriteStatusDTOSchema>;

export const getFavoriteStatus = async (
  params: GetFavoriteStatusParams
): Promise<ApiResponse<FavoriteStatusDTO>> => {
  const validatedParams = GetFavoriteStatusParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteStatus(validatedParams.productId),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites/${validatedParams.productId}/status`,
    FavoriteStatusDTOSchema
  );
};
