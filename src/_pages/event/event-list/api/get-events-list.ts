'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  EVENT_QUERIES,
  getEventsList,
  type EventStatusParam,
} from '@/shared/api/endpoints/event';

export type { EventStatusParam };

export function useEventsList(status: EventStatusParam, enabled: boolean) {
  return useQuery({
    queryKey: EVENT_QUERIES.list(status),
    queryFn: () => getEventsList(status),
    enabled,
    staleTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
