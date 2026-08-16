'use client';

import { useAuthStore } from '@/shared/auth';
import { useFavoriteToggle } from '@/shared/lib/use-favorite-toggle';
import type { ApiResponse } from '@/shared/api';
import {
  deleteFavorite,
  FAVORITE_PRODUCT_QUERIES,
  type FavoriteListDTO,
} from '@/shared/api/favorite-product';
import { getFavoriteStatus } from '../api/get-favorite-status';
import { addFavorite } from '../api/add-favorite';

interface UseProductFavoriteToggleParams {
  productId: number;
  title: string;
  price: number;
  mainImageUrl: string;
}

export function useProductFavoriteToggle({
  productId,
  title,
  price,
  mainImageUrl,
}: UseProductFavoriteToggleParams) {
  const userUuid = useAuthStore((state) => state.userUuid);

  return useFavoriteToggle<ApiResponse<FavoriteListDTO>>({
    enabled: !!userUuid && !!productId,
    statusQueryKey: ['favorite-status', userUuid, productId],
    listQueryKey: FAVORITE_PRODUCT_QUERIES.list(userUuid).queryKey,
    fetchStatus: () => getFavoriteStatus({ uuid: userUuid, productId }),
    addFavorite: () =>
      addFavorite({ uuid: userUuid }, { productId: String(productId) }),
    removeFavorite: () => deleteFavorite({ uuid: userUuid, productId }),
    patchListCache: (old, adding) => {
      if (!old) return old;

      if (adding) {
        const alreadyExists = old.data.products.some(
          (p) => p.productId === productId
        );
        if (alreadyExists) return old;

        return {
          ...old,
          data: {
            ...old.data,
            totalCount: old.data.totalCount + 1,
            products: [
              {
                productId,
                title,
                price,
                mainImageUrl,
                favoritedAt: new Date().toISOString(),
                status: 'SELLING' as const,
              },
              ...old.data.products,
            ],
          },
        };
      }

      return {
        ...old,
        data: {
          ...old.data,
          totalCount: old.data.totalCount - 1,
          products: old.data.products.filter((p) => p.productId !== productId),
        },
      };
    },
  });
}
