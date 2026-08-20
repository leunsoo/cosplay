import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { getDemoRecentlyViewedList } from '@/mocks';

// 최근 본 상품 목록 조회 API

const RecentlyViewedProductDTOSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  mainImageUrl: z.string(),
  viewedAt: z.string(),
  status: z.enum(['SELLING', 'RESERVED', 'SOLD', 'DELETED']),
});

export const GetRecentlyViewedListParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type GetRecentlyViewedListParams = z.infer<
  typeof GetRecentlyViewedListParamsSchema
>;

export const RecentlyViewedListDTOSchema = z.object({
  products: z.array(RecentlyViewedProductDTOSchema),
  totalCount: z.number().int().nonnegative(),
});
export type RecentlyViewedListDTO = z.infer<typeof RecentlyViewedListDTOSchema>;

export const getRecentlyViewedList = async (
  params: GetRecentlyViewedListParams
): Promise<ApiResponse<RecentlyViewedListDTO>> => {
  const validatedParams = GetRecentlyViewedListParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoRecentlyViewedList(),
    };

  return apiClient.getWithValidation(
    '/api/v1/recently-viewed',
    RecentlyViewedListDTOSchema,
    {
      params: validatedParams,
    }
  );
};
