import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';
import { clearDemoRecentlyViewed } from '@/mocks';

// 최근 본 상품 기록 전체 삭제 API

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

export function useDeleteAllRecentlyViewed(uuid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllRecentlyViewed({ uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(uuid),
      });
    },
  });
}
