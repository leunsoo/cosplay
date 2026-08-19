import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventList } from '@/mocks';

const EventDTOSchema = z.object({
  eventId: z.number().int().positive(),
  title: z.string().min(1),
  thumbnailUrl: z.string().url(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  price: z.number(),
  status: z.enum(['UPCOMING', 'ONGOING', 'CLOSED']),
  category: z.string(),
});

// 현재 백엔드는 배열 직접 반환
export const EventListDTOSchema = z.array(EventDTOSchema);

export type EventListDTO = z.infer<typeof EventListDTOSchema>;
export type EventDTO = z.infer<typeof EventDTOSchema>;

export type EventStatusParam = 'ALL' | 'UPCOMING' | 'ONGOING' | 'CLOSED';

// getEventsList/getEventsListServer가 공통으로 쓰는 데모 모드 필터링
export function resolveDemoEvents(
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
