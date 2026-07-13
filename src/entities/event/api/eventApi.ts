import { apiClient, serverFetch, type ApiResponse } from '@/shared/api';
import { EventListDTOSchema, type EventListDTO } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventList } from '@/mocks/event';

export type EventStatusParam = 'ALL' | 'UPCOMING' | 'ONGOING' | 'CLOSED';

function resolveDemoEvents(
  status: EventStatusParam
): ApiResponse<EventListDTO> {
  const filtered =
    status === 'ALL'
      ? mockEventList
      : mockEventList.filter((e) => e.status === status);
  return { status: 'SUCCESS', message: '성공', data: filtered };
}

export const getEventsList = async (
  status: EventStatusParam = 'ALL'
): Promise<ApiResponse<EventListDTO>> => {
  if (IS_DEMO) return resolveDemoEvents(status);
  return apiClient.getWithValidation(
    `/api/v1/events?status=${status}`,
    EventListDTOSchema
  );
};

// 서버 컴포넌트 / prefetchQuery 전용: apiClient(axios)는 내부적으로
// Zustand(useAuthStore)를 참조해 서버 컴포넌트에서 사용할 수 없음
// options: 호출부마다 캐싱 정책이 다름 (예: sitemap.ts는 revalidate 3600)
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
