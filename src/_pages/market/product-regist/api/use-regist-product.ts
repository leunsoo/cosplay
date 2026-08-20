'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createProduct, PRODUCT_QUERIES } from '@/shared/api/endpoints/product';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { buildProductBody } from './build-product-body';
import type { ProductFormValues } from '../model/product-form';

export function useRegistProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async (formData: ProductFormValues) => {
      const body = await buildProductBody(formData);
      return createProduct({ uuid: userUuid }, body);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERIES.all() });
      router.push(ROUTES.PRODUCT.DETAIL(response.data.id));
    },
    onError: (error) => {
      console.error('상품 등록 실패:', error);
    },
  });

  return { submit, isPending };
}
