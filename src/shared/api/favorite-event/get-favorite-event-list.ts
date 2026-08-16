import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteEventList } from '@/mocks';

// 찜한 행사 목록 조회 API

const FavoriteEventDTOSchema = z.object({
  eventId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  price: z.number(),
  status: z.string(),
  category: z.string(),
  favoritedAt: z.string(),
});

export const GetFavoriteEventListParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type GetFavoriteEventListParams = z.infer<
  typeof GetFavoriteEventListParamsSchema
>;

export const FavoriteEventListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  events: z.array(FavoriteEventDTOSchema),
});
export type FavoriteEventListDTO = z.infer<typeof FavoriteEventListDTOSchema>;

export const getFavoriteEventList = async (
  params: GetFavoriteEventListParams
): Promise<ApiResponse<FavoriteEventListDTO>> => {
  const validatedParams = GetFavoriteEventListParamsSchema.parse(params);

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
