import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { addDemoFavoriteEvent, getDemoFavoriteEventList } from '@/mocks';

// 행사 찜하기 API

export const AddFavoriteEventParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type AddFavoriteEventParams = z.infer<
  typeof AddFavoriteEventParamsSchema
>;

export const AddFavoriteEventBodySchema = z.object({
  eventId: z.number().int().positive(),
});
export type AddFavoriteEventBody = z.infer<typeof AddFavoriteEventBodySchema>;

// 행사 찜하기/찜하기 취소 공통 응답 스키마 (delete-favorite-event.ts에서도 사용)
export const FavoriteEventActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});
export type FavoriteEventActionResponse = z.infer<
  typeof FavoriteEventActionResponseSchema
>;

export const addFavoriteEvent = async (
  params: AddFavoriteEventParams,
  body: AddFavoriteEventBody
): Promise<ApiResponse<FavoriteEventActionResponse>> => {
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

  return apiClient.postWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorite-events`,
    FavoriteEventActionResponseSchema,
    validatedBody
  );
};
