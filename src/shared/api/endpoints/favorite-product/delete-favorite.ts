import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { removeDemoFavoriteProduct, getDemoFavoriteProductList } from '@/mocks';

// 찜하기 취소 API

export const DeleteFavoriteParamsSchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});
export type DeleteFavoriteParams = z.infer<typeof DeleteFavoriteParamsSchema>;

// 찜하기 취소 응답 스키마 (add-favorite.ts의 응답 스키마와 모양은 같지만 독립적으로 관리)
export const FavoriteActionResponseSchema = z.object({
  success: z.boolean(),
  totalCount: z.number().int().nonnegative(),
});
export type FavoriteActionResponse = z.infer<
  typeof FavoriteActionResponseSchema
>;

export const deleteFavorite = async (
  params: DeleteFavoriteParams
): Promise<ApiResponse<FavoriteActionResponse>> => {
  const validatedParams = DeleteFavoriteParamsSchema.parse(params);

  if (IS_DEMO) {
    removeDemoFavoriteProduct(validatedParams.productId);
    return {
      status: 'SUCCESS',
      message: '성공',
      data: {
        success: true,
        totalCount: getDemoFavoriteProductList().totalCount,
      },
    };
  }

  return apiClient.deleteWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites/${validatedParams.productId}`,
    FavoriteActionResponseSchema
  );
};
