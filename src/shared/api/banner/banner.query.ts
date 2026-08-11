import { queryOptions } from '@tanstack/react-query';
import { getBannerList } from './get-banner-list';

export const BANNER_QUERIES = {
  all: () => ['banners'] as const,
  list: () =>
    queryOptions({
      queryKey: BANNER_QUERIES.all(),
      queryFn: () => getBannerList(),
    }),
};
