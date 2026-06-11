import { apiClient, type ApiResponse } from '@/shared/api';
import { EventListDTOSchema, type EventListDTO } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventList } from '@/mocks/event';

export type EventStatusParam = 'ALL' | 'UPCOMING' | 'ONGOING' | 'CLOSED';

export const getEventsList = async (
  status: EventStatusParam = 'ALL'
): Promise<ApiResponse<EventListDTO>> => {
  if (IS_DEMO) {
    const filtered =
      status === 'ALL'
        ? mockEventList
        : mockEventList.filter((e) => e.status === status);
    return { status: 'SUCCESS', message: '성공', data: filtered };
  }
  return apiClient.getWithValidation(
    `/api/v1/events?status=${status}`,
    EventListDTOSchema
  );
};
