import { apiClient, type ApiResponse } from '@/shared/api';
import { EventListDTOSchema, type EventListDTO } from '../model';

export type EventStatusParam = 'ALL' | 'UPCOMING' | 'ONGOING' | 'CLOSED';

export const getEventsList = async (
  status: EventStatusParam = 'ALL'
): Promise<ApiResponse<EventListDTO>> => {
  return apiClient.getWithValidation(
    `/api/v1/events?status=${status}`,
    EventListDTOSchema
  );
};
