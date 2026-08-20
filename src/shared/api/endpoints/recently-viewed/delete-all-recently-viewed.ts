import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { clearDemoRecentlyViewed } from '@/mocks';

export const DeleteAllRecentlyViewedParamsSchema = z.object({
  uuid: z.string().min(1),
});
export type DeleteAllRecentlyViewedParams = z.infer<
  typeof DeleteAllRecentlyViewedParamsSchema
>;

export const DeleteAllRecentlyViewedDTOSchema = z.object({
  deletedCount: z.number(),
});
export type DeleteAllRecentlyViewedDTO = z.infer<
  typeof DeleteAllRecentlyViewedDTOSchema
>;

export const deleteAllRecentlyViewed = async (
  params: DeleteAllRecentlyViewedParams
): Promise<ApiResponse<DeleteAllRecentlyViewedDTO>> => {
  const validatedParams = DeleteAllRecentlyViewedParamsSchema.parse(params);

  if (IS_DEMO) {
    const deletedCount = clearDemoRecentlyViewed();
    return { status: 'SUCCESS', message: '성공', data: { deletedCount } };
  }

  return apiClient.deleteWithValidation(
    '/api/v1/recently-viewed',
    DeleteAllRecentlyViewedDTOSchema,
    { params: validatedParams }
  );
};
