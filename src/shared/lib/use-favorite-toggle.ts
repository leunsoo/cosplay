'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import type { ApiResponse } from '@/shared/api';

interface UseFavoriteToggleConfig<TListData> {
  enabled: boolean;
  statusQueryKey: QueryKey;
  listQueryKey: QueryKey;
  fetchStatus: () => Promise<ApiResponse<{ isFavorited: boolean }>>;
  addFavorite: () => Promise<unknown>;
  removeFavorite: () => Promise<unknown>;
  patchListCache: (
    old: TListData | undefined,
    adding: boolean
  ) => TListData | undefined;
}

// 낙관적 업데이트 + 300ms 디바운스 + 목록 캐시 패치가 필요한 찜 토글 버튼의 공통 오케스트레이션.
// 도메인 API/스키마는 호출부에서 그대로 소유하고, 이 훅은 배선만 담당한다.
export function useFavoriteToggle<TListData>({
  enabled,
  statusQueryKey,
  listQueryKey,
  fetchStatus,
  addFavorite,
  removeFavorite,
  patchListCache,
}: UseFavoriteToggleConfig<TListData>) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: statusQueryKey,
    queryFn: fetchStatus,
    enabled,
    staleTime: 0,
    gcTime: 0,
  });

  const isFavorited = data?.data.isFavorited ?? false;

  const [optimisticFavorited, setOptimisticFavorited] = useState<
    boolean | null
  >(null);

  const displayedFavorited = optimisticFavorited ?? isFavorited;

  const invalidateAndResetOptimistic = () => {
    queryClient.invalidateQueries({ queryKey: statusQueryKey });
    queryClient.invalidateQueries({ queryKey: listQueryKey });
    setOptimisticFavorited(null);
  };

  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onError: () => setOptimisticFavorited(null),
    onSettled: invalidateAndResetOptimistic,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFavorite,
    onError: () => setOptimisticFavorited(null),
    onSettled: invalidateAndResetOptimistic,
  });

  const debouncedMutate = useDebouncedCallback((shouldFavorite: boolean) => {
    if (shouldFavorite) {
      addFavoriteMutation.mutate();
    } else {
      removeFavoriteMutation.mutate();
    }
  }, 300);

  const handleClick = () => {
    const nextFavorited = !displayedFavorited;

    setOptimisticFavorited(nextFavorited);

    queryClient.setQueryData<TListData>(listQueryKey, (old) =>
      patchListCache(old, nextFavorited)
    );

    debouncedMutate(nextFavorited);
  };

  const isPending =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  return { displayedFavorited, isPending, isLoading, handleClick };
}
