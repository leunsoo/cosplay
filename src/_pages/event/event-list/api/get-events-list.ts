'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { EVENT_QUERIES } from './event.query';
import {
  EventListDTOSchema,
  resolveDemoEvents,
  type EventListDTO,
  type EventDTO,
  type EventStatusParam,
} from './get-events-list.type';

// 행사 목록 조회 API

export type { EventListDTO, EventDTO, EventStatusParam };

export const getEventsList = async (
  status: EventStatusParam = 'ALL'
): Promise<ApiResponse<EventListDTO>> => {
  if (IS_DEMO) return resolveDemoEvents(status);
  return apiClient.getWithValidation(
    `/api/v1/events?status=${status}`,
    EventListDTOSchema
  );
};

export function useEventsList(status: EventStatusParam, enabled: boolean) {
  return useQuery({
    queryKey: EVENT_QUERIES.list(status),
    queryFn: () => getEventsList(status),
    enabled,
    staleTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
