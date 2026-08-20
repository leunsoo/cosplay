import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { addDemoFavoriteMeetup, getDemoFavoriteMeetupList } from '@/mocks';

// 개인 행사(모임) 찜하기 API

export const AddFavoriteMeetupParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type AddFavoriteMeetupParams = z.infer<
  typeof AddFavoriteMeetupParamsSchema
>;

export const AddFavoriteMeetupBodySchema = z.object({
  meetupId: z.number().int().positive(),
});
export type AddFavoriteMeetupBody = z.infer<typeof AddFavoriteMeetupBodySchema>;

export const FavoriteMeetupActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});
export type FavoriteMeetupActionResponse = z.infer<
  typeof FavoriteMeetupActionResponseSchema
>;

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
