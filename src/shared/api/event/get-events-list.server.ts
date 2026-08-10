import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  EventListDTOSchema,
  resolveDemoEvents,
  type EventListDTO,
  type EventStatusParam,
} from './event';

export const getEventsListServer = async (
  status: EventStatusParam = 'ALL',
  options?: { revalidate?: number; tags?: string[] }
): Promise<ApiResponse<EventListDTO>> => {
  if (IS_DEMO) return resolveDemoEvents(status);
  return serverFetch(`/api/v1/events?status=${status}`, EventListDTOSchema, {
    revalidate: options?.revalidate ?? 300,
    tags: options?.tags ?? ['events'],
  });
};
