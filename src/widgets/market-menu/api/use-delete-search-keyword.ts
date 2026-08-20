'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteSearchKeyword,
  SEARCH_KEYWORDS_QUERIES,
} from '@/shared/api/endpoints/search-keywords';
import { useAuthStore } from '@/shared/auth';

export function useDeleteSearchKeyword() {
  const userUuid = useAuthStore((state) => state.userUuid);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keywordId: number) =>
      deleteSearchKeyword({ keywordId, uuid: userUuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SEARCH_KEYWORDS_QUERIES.list(userUuid),
      });
    },
  });
}
