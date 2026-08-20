import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { addDemoRecentlyViewed } from '@/mocks';

export const AddRecentlyViewedBodySchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});
export type AddRecentlyViewedBody = z.infer<typeof AddRecentlyViewedBodySchema>;

export const addRecentlyViewed = async (
  body: AddRecentlyViewedBody
): Promise<ApiResponse<null>> => {
  const validatedBody = AddRecentlyViewedBodySchema.parse(body);

  if (IS_DEMO) {
    addDemoRecentlyViewed(validatedBody.productId);
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.postWithValidation(
    '/api/v1/recently-viewed',
    z.null(),
    validatedBody
  );
};
