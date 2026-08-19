'use client';

import { useQuery } from '@tanstack/react-query';
import { BANNER_QUERIES, getBannerList } from '@/shared/api/endpoints/banner';

export function useBannerList() {
  return useQuery({
    queryKey: BANNER_QUERIES.list(),
    queryFn: getBannerList,
  });
}
