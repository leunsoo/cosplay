import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoFavoriteProductList } from '@/mocks';

// 찜한 상품 목록 조회 API

const FavoriteProductDTOSchema = z.object({
  productId: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  favoritedAt: z.string(),
  status: z.enum(['SELLING', 'RESERVED', 'SOLD', 'DELETED']),
});

export const GetFavoriteListParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type GetFavoriteListParams = z.infer<typeof GetFavoriteListParamsSchema>;

export const FavoriteListDTOSchema = z.object({
  totalCount: z.number().int().nonnegative(),
  products: z.array(FavoriteProductDTOSchema),
});
export type FavoriteListDTO = z.infer<typeof FavoriteListDTOSchema>;

export const getFavoriteList = async (
  params: GetFavoriteListParams
): Promise<ApiResponse<FavoriteListDTO>> => {
  const validatedParams = GetFavoriteListParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoFavoriteProductList(),
    };

  return apiClient.getWithValidation(
    `/api/v1/users/${validatedParams.uuid}/favorites`,
    FavoriteListDTOSchema
  );
};
