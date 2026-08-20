import { queryOptions } from '@tanstack/react-query';
import { getFavoriteEventList } from './get-favorite-event-list';

export const FAVORITE_EVENT_QUERIES = {
  all: () => ['favorite-event'] as const,
  list: (uuid: string) =>
    queryOptions({
      queryKey: [...FAVORITE_EVENT_QUERIES.all(), uuid] as const,
      queryFn: () => getFavoriteEventList({ uuid }),
      enabled: !!uuid,
    }),
  statuses: () => [...FAVORITE_EVENT_QUERIES.all(), 'status'] as const,
  status: (uuid: string, eventId: number) =>
    [...FAVORITE_EVENT_QUERIES.statuses(), uuid, eventId] as const,
};
