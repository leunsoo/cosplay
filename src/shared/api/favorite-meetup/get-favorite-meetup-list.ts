import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteMeetupList } from '@/mocks';

// 찜한 개인 행사(모임) 목록 조회 API

const FavoriteMeetupDTOSchema = z.object({
  meetupId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string(),
  scheduledAt: z.string(),
  location: z.string(),
  maxMembers: z.number().int().nonnegative(),
  currentMembers: z.number().int().nonnegative(),
  status: z.string(),
  favoritedAt: z.string(),
});

export const GetFavoriteMeetupListParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type GetFavoriteMeetupListParams = z.infer<
  typeof GetFavoriteMeetupListParamsSchema
>;

export const FavoriteMeetupListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  meetups: z.array(FavoriteMeetupDTOSchema),
});
export type FavoriteMeetupListDTO = z.infer<typeof FavoriteMeetupListDTOSchema>;

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
