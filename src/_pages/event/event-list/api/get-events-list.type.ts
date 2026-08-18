// 'use client' 파일(get-events-list.ts)의 export는 서버에서 직접 호출할 수 없고
// (RSC client reference 에러), 'server-only' 파일(get-events-list.server.ts)은
// 반대로 클라이언트에서 import할 수 없다.
// 스키마/타입/데모 데이터 로직은 양쪽이 함께 쓰므로 어느 한쪽 파일에도 둘 수 없어
// 지시어가 없는 이 파일로 분리했다.
import { z } from 'zod';
import { type ApiResponse } from '@/shared/api';
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
