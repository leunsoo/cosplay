import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { type ApiResponse } from '@/shared/api';
import { useAuthStore } from '@/shared/store/authStore';
import { getFavoriteStatus, addFavorite, deleteFavorite } from '../../api';
import { type FavoriteListDTO } from '../index';

interface UseFavoriteButtonParams {
  productId: number;
  title: string;
  price: number;
  mainImageUrl: string;
}

export function useFavoriteToggle({
  productId,
  title,
  price,
  mainImageUrl,
}: UseFavoriteButtonParams) {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  // 찜 상태 조회
  const { data, isLoading } = useQuery({
    queryKey: ['favorite-status', userUuid, productId],
    queryFn: () => getFavoriteStatus({ uuid: userUuid, productId }),
    enabled: !!userUuid && !!productId,
    staleTime: 0,
    gcTime: 0,
  });

  const isFavorited = data?.data.isFavorited ?? false;

  // 낙관적 UI 상태 (즉각 반응을 위한 로컬 상태)
  const [optimisticFavorited, setOptimisticFavorited] = useState<
    boolean | null
  >(null);

  // UI에 표시할 찜 상태 (낙관적 상태 우선, 없으면 서버 상태)
  const displayedFavorited = optimisticFavorited ?? isFavorited;

  // 찜하기 mutation
  const addFavoriteMutation = useMutation({
    mutationFn: () =>
      addFavorite({ uuid: userUuid }, { productId: String(productId) }),
    onError: () => {
      // 오류 발생 시 낙관적 상태 초기화 → 원래 서버 상태로 복원
      setOptimisticFavorited(null);
    },
    onSettled: () => {
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({
        queryKey: ['favorite-status', userUuid, productId],
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite', userUuid],
      });
      // 낙관적 상태 초기화
      setOptimisticFavorited(null);
    },
  });

  // 찜하기 취소 mutation
  const deleteFavoriteMutation = useMutation({
    mutationFn: () => deleteFavorite({ uuid: userUuid, productId }),
    onError: () => {
      // 오류 발생 시 낙관적 상태 초기화 → 원래 서버 상태로 복원
      setOptimisticFavorited(null);
    },
    onSettled: () => {
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({
        queryKey: ['favorite-status', userUuid, productId],
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite', userUuid],
      });
      // 낙관적 상태 초기화
      setOptimisticFavorited(null);
    },
  });

  // 디바운싱된 mutation 호출
  const debouncedMutate = useDebouncedCallback((shouldFavorite: boolean) => {
    if (shouldFavorite) {
      addFavoriteMutation.mutate();
    } else {
      deleteFavoriteMutation.mutate();
    }
  }, 300);

  const handleClick = () => {
    const nextFavorited = !displayedFavorited;

    // 1. FavoriteButton UI 즉시 변경
    setOptimisticFavorited(nextFavorited);

    // 2. FavoriteList 캐시 즉시 업데이트 (API 호출 없음)
    queryClient.setQueryData(
      ['favorite', userUuid],
      (old: ApiResponse<FavoriteListDTO> | undefined) => {
        if (!old) return old;

        if (nextFavorited) {
          // 이미 목록에 있으면 추가하지 않음 (중복 방지)
          const alreadyExists = old.data.products.some(
            (p) => p.productId === productId
          );
          if (alreadyExists) return old;

          // 찜하기: 목록 맨 앞에 즉시 추가
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
        } else {
          // 찜 취소: 목록에서 즉시 제거
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
        }
      }
    );

    // 3. 서버 요청은 디바운싱 (API 호출은 300ms 후 1회만)
    debouncedMutate(nextFavorited);
  };

  const isPending =
    addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  return { displayedFavorited, isPending, isLoading, handleClick };
}
