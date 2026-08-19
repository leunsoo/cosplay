'use client';

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { addDemoRecentlyViewed } from '@/mocks';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';
import { useLogined } from '@/entities/auth';

// 상품 기록 추가 API

const AddRecentlyViewedBodySchema = z.object({
  uuid: z.string().min(1),
  productId: z.number().int().positive(),
});
type AddRecentlyViewedBody = z.infer<typeof AddRecentlyViewedBodySchema>;

const addRecentlyViewed = async (
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

interface UseAddRecentlyViewedParams {
  uuid: string;
  productId: number;
}

export function useAddRecentlyViewed({
  uuid,
  productId,
}: UseAddRecentlyViewedParams) {
  const logined = useLogined();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addRecentlyViewed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(uuid),
      });
    },
  });

  useEffect(() => {
    if (!logined) return;
    mutation.mutate({ uuid, productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
