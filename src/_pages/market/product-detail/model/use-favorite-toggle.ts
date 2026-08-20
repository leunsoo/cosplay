'use client';

import { useAuthStore } from '@/shared/auth';
import { useOptimisticToggle } from '@/shared/lib/use-optimistic-toggle';
import type { ApiResponse } from '@/shared/api';
import {
  deleteFavorite,
  addFavorite,
  getFavoriteStatus,
  FAVORITE_PRODUCT_QUERIES,
  type FavoriteListDTO,
} from '@/shared/api/endpoints/favorite-product';

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

  const { displayedActive, isPending, isLoading, handleClick } =
    useOptimisticToggle<ApiResponse<FavoriteListDTO>>({
      enabled: !!userUuid && !!productId,
      statusQueryKey: FAVORITE_PRODUCT_QUERIES.status(userUuid, productId),
      listQueryKey: FAVORITE_PRODUCT_QUERIES.list(userUuid).queryKey,
      fetchIsActive: () => getFavoriteStatus({ uuid: userUuid, productId }),
      activate: () =>
        addFavorite({ uuid: userUuid }, { productId: String(productId) }),
      deactivate: () => deleteFavorite({ uuid: userUuid, productId }),
      patchListCache: (old, activating) => {
        if (!old) return old;

        if (activating) {
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
            products: old.data.products.filter(
              (p) => p.productId !== productId
            ),
          },
        };
      },
    });

  return {
    displayedFavorited: displayedActive,
    isPending,
    isLoading,
    handleClick,
  };
}
