'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateProductStatus,
  type UpdateProductStatusBody,
} from '@/shared/api/endpoints/product';
import { FAVORITE_PRODUCT_QUERIES } from '@/shared/api/endpoints/favorite-product';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';

interface UseUpdateProductStatusParams {
  userUuid: string;
  productId: number;
}

export function useUpdateProductStatus({
  userUuid,
  productId,
}: UseUpdateProductStatusParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: UpdateProductStatusBody['status']) =>
      updateProductStatus({ uuid: userUuid, productId }, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_PRODUCT_QUERIES.all(),
      });
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(userUuid),
      });
    },
    onError: () => alert('상태 변경에 실패했습니다.'),
  });
}
