'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteAllSearchKeywords,
  SEARCH_KEYWORDS_QUERIES,
} from '@/shared/api/endpoints/search-keywords';
import { useAuthStore } from '@/shared/auth';

export function useDeleteAllSearchKeywords() {
  const userUuid = useAuthStore((state) => state.userUuid);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllSearchKeywords({ uuid: userUuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SEARCH_KEYWORDS_QUERIES.list(userUuid),
      });
    },
  });
}
