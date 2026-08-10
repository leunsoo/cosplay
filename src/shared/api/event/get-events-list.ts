import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  EventListDTOSchema,
  resolveDemoEvents,
  type EventListDTO,
  type EventStatusParam,
} from './event';

export const getEventsList = async (
  status: EventStatusParam = 'ALL'
): Promise<ApiResponse<EventListDTO>> => {
  if (IS_DEMO) return resolveDemoEvents(status);
  return apiClient.getWithValidation(
    `/api/v1/events?status=${status}`,
    EventListDTOSchema
  );
};
