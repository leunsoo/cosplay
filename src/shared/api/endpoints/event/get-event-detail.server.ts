import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import {
  EventDetailDTOSchema,
  resolveDemoEventDetail,
  type EventDetailDTO,
  type GetEventDetailParams,
} from './get-event-detail';

// 서버 컴포넌트 / prefetchQuery 전용: apiClient(axios)는 내부적으로
// Zustand(useAuthStore)를 참조해 서버 컴포넌트에서 사용할 수 없음
export const getEventDetailServer = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return serverFetch(`/api/v1/events/${params.eventId}`, EventDetailDTOSchema, {
    revalidate: 300,
    tags: ['events'],
  });
};
