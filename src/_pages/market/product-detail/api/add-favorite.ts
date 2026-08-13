import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { addDemoFavoriteProduct, getDemoFavoriteProductList } from '@/mocks';

// 상품 찜하기 API

export const AddFavoriteParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type AddFavoriteParams = z.infer<typeof AddFavoriteParamsSchema>;

export const AddFavoriteBodySchema = z.object({
  productId: z.string().min(1),
});
export type AddFavoriteBody = z.infer<typeof AddFavoriteBodySchema>;

// 찜하기 응답 스키마
export const FavoriteActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});
export type FavoriteActionResponse = z.infer<
  typeof FavoriteActionResponseSchema
>;

export const addFavorite = async (
  params: AddFavoriteParams,
  body: AddFavoriteBody
): Promise<ApiResponse<FavoriteActionResponse>> => {
  const validatedParams = AddFavoriteParamsSchema.parse(params);
  const validatedBody = AddFavoriteBodySchema.parse(body);

  if (IS_DEMO) {
    addDemoFavoriteProduct(Number(validatedBody.productId));
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteProductList().totalCount,
      },
    };
  }

  return apiClient.postWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites`,
    FavoriteActionResponseSchema,
    validatedBody
  );
};
