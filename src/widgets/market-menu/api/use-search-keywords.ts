'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getSearchKeywords,
  SEARCH_KEYWORDS_QUERIES,
} from '@/shared/api/endpoints/search-keywords';
import { useAuthStore } from '@/shared/auth';

export function useSearchKeywords() {
  const userUuid = useAuthStore((state) => state.userUuid);

  const { data } = useQuery({
    queryKey: SEARCH_KEYWORDS_QUERIES.list(userUuid),
    queryFn: () => getSearchKeywords({ uuid: userUuid }),
    enabled: !!userUuid,
    staleTime: Infinity,
  });

  return { keywords: data?.data.keywords ?? [] };
}
