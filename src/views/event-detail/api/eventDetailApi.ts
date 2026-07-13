import { apiClient, serverFetch, type ApiResponse } from '@/shared/api';
import { EventDetailDTOSchema, type EventDetailDTO } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventDetails } from '@/mocks/event';

export interface GetEventDetailParams {
  eventId: number;
}

function resolveDemoEventDetail(
  eventId: number
): ApiResponse<EventDetailDTO> {
  const detail = mockEventDetails[eventId] ?? mockEventDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}

export const getEventDetail = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return apiClient.getWithValidation(
    `/api/v1/events/${params.eventId}`,
    EventDetailDTOSchema
  );
};

// 서버 컴포넌트 / prefetchQuery 전용: apiClient(axios)는 내부적으로
// Zustand(useAuthStore)를 참조해 서버 컴포넌트에서 사용할 수 없음
export const getEventDetailServer = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return serverFetch(
    `/api/v1/events/${params.eventId}`,
    EventDetailDTOSchema,
    { revalidate: 300, tags: ['events'] }
  );
};
