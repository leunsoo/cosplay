'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateProduct, PRODUCT_QUERIES } from '@/shared/api/endpoints/product';
import { FAVORITE_PRODUCT_QUERIES } from '@/shared/api/endpoints/favorite-product';
import { RECENTLY_VIEWED_QUERIES } from '@/shared/api/endpoints/recently-viewed';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { buildProductBody } from './build-product-body';
import type { ProductFormValues } from '../model/product-form';

interface UseUpdateProductParams {
  productId: number;
  initialImageUrl?: string;
}

export function useUpdateProduct({
  productId,
  initialImageUrl,
}: UseUpdateProductParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (formData: ProductFormValues) => {
      const body = await buildProductBody(formData, initialImageUrl);
      return updateProduct({ uuid: userUuid, productId }, body);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.all() });
      queryClient.invalidateQueries({
        queryKey: FAVORITE_PRODUCT_QUERIES.all(),
      });
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(userUuid),
      });
      router.push(ROUTES.PRODUCT.DETAIL(response.data.id));
    },
    onError: (error) => {
      console.error('상품 수정 실패:', error);
    },
  });

  return { submit, isPending };
}
