import { queryOptions } from '@tanstack/react-query';
import { getEventsList } from './get-events-list';
import type { EventStatusParam } from './event';

export const EVENT_QUERIES = {
  all: () => ['events'] as const,
  list: (status: EventStatusParam) =>
    queryOptions({
      queryKey: [...EVENT_QUERIES.all(), status] as const,
      queryFn: () => getEventsList(status),
    }),
};
