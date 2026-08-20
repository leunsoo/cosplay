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

  statuses: () => [...FAVORITE_PRODUCT_QUERIES.all(), 'status'] as const,
  status: (uuid: string, productId: number) =>
    [...FAVORITE_PRODUCT_QUERIES.statuses(), uuid, productId] as const,
};
