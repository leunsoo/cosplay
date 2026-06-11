import { apiClient, type ApiResponse } from '@/shared/api';
import { EventDetailDTOSchema, type EventDetailDTO } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventDetails } from '@/mocks/event';

export interface GetEventDetailParams {
  eventId: number;
}

export const getEventDetail = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) {
    const detail = mockEventDetails[params.eventId] ?? mockEventDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }
  return apiClient.getWithValidation(
    `/api/v1/events/${params.eventId}`,
    EventDetailDTOSchema
  );
};
