'use client';

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addRecentlyViewed,
  RECENTLY_VIEWED_QUERIES,
} from '@/shared/api/endpoints/recently-viewed';
import { useLogined } from '@/shared/auth';

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
