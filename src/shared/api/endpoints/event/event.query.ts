import type { EventStatusParam } from './get-events-list';

export const EVENT_QUERIES = {
  all: () => ['events'] as const,
  list: (status: EventStatusParam) => [...EVENT_QUERIES.all(), status] as const,
  detail: (eventId: string) =>
    [...EVENT_QUERIES.all(), 'detail', eventId] as const,
};
