import { apiClient, type ApiResponse } from '@/shared/api';
import { EventDetailDTOSchema, type EventDetailDTO } from '../model';

export interface GetEventDetailParams {
  eventId: number;
}

export const getEventDetail = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  return apiClient.getWithValidation(
    `/api/v1/events/${params.eventId}`,
    EventDetailDTOSchema
  );
};
