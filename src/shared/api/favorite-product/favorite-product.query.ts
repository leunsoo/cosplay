import { queryOptions } from '@tanstack/react-query';
import { getFavoriteList } from './get-favorite-list';

export const FAVORITE_PRODUCT_QUERIES = {
  all: () => ['favorite-product'] as const,
  list: (uuid: string) =>
    queryOptions({
      queryKey: [...FAVORITE_PRODUCT_QUERIES.all(), uuid] as const,
      queryFn: () => getFavoriteList({ uuid }),
      enabled: !!uuid,
    }),
};
