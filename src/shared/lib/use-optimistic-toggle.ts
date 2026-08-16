'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import type { ApiResponse } from '@/shared/api';

interface UseOptimisticToggleConfig<TListData> {
  enabled: boolean;
  statusQueryKey: QueryKey;
  listQueryKey: QueryKey;
  fetchIsActive: () => Promise<ApiResponse<{ isFavorited: boolean }>>;
  activate: () => Promise<unknown>;
  deactivate: () => Promise<unknown>;
  patchListCache: (
    old: TListData | undefined,
    activating: boolean
  ) => TListData | undefined;
}

// 낙관적 업데이트 + 300ms 디바운스 + 목록 캐시 패치가 필요한 boolean 토글의 공통 오케스트레이션.
// 도메인 API/스키마는 호출부에서 그대로 소유하고, 이 훅은 배선만 담당한다.
export function useOptimisticToggle<TListData>({
  enabled,
  statusQueryKey,
  listQueryKey,
  fetchIsActive,
  activate,
  deactivate,
  patchListCache,
}: UseOptimisticToggleConfig<TListData>) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: statusQueryKey,
    queryFn: fetchIsActive,
    enabled,
    staleTime: 0,
    gcTime: 0,
  });

  const isActive = data?.data.isFavorited ?? false;

  const [optimisticActive, setOptimisticActive] = useState<boolean | null>(
    null
  );

  const displayedActive = optimisticActive ?? isActive;

  const invalidateAndResetOptimistic = () => {
    queryClient.invalidateQueries({ queryKey: statusQueryKey });
    queryClient.invalidateQueries({ queryKey: listQueryKey });
    setOptimisticActive(null);
  };

  const activateMutation = useMutation({
    mutationFn: activate,
    onError: () => setOptimisticActive(null),
    onSettled: invalidateAndResetOptimistic,
  });

  const deactivateMutation = useMutation({
    mutationFn: deactivate,
    onError: () => setOptimisticActive(null),
    onSettled: invalidateAndResetOptimistic,
  });

  const debouncedMutate = useDebouncedCallback((nextActive: boolean) => {
    if (nextActive) {
      activateMutation.mutate();
    } else {
      deactivateMutation.mutate();
    }
  }, 300);

  const handleClick = () => {
    const nextActive = !displayedActive;

    setOptimisticActive(nextActive);

    queryClient.setQueryData<TListData>(listQueryKey, (old) =>
      patchListCache(old, nextActive)
    );

    debouncedMutate(nextActive);
  };

  const isPending = activateMutation.isPending || deactivateMutation.isPending;

  return { displayedActive, isPending, isLoading, handleClick };
}
