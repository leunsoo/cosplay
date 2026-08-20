'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct, PRODUCT_QUERIES } from '@/shared/api/endpoints/product';
import { FAVORITE_PRODUCT_QUERIES } from '@/shared/api/endpoints/favorite-product';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';
import { ROUTES } from '@/shared/routes';

interface UseDeleteProductParams {
  userUuid: string;
  productId: number;
}

export function useDeleteProduct({
  userUuid,
  productId,
}: UseDeleteProductParams) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct({ uuid: userUuid, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.all() });
      queryClient.invalidateQueries({
        queryKey: FAVORITE_PRODUCT_QUERIES.all(),
      });
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(userUuid),
      });
      router.push(ROUTES.MARKET);
    },
    onError: () => alert('상품 삭제에 실패했습니다.'),
  });
}
