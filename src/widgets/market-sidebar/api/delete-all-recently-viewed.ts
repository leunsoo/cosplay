'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteAllRecentlyViewed,
  RECENTLY_VIEWED_QUERIES,
} from '@/shared/api/endpoints/recently-viewed';

export function useDeleteAllRecentlyViewed(uuid: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllRecentlyViewed({ uuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RECENTLY_VIEWED_QUERIES.list(uuid),
      });
    },
  });
}
