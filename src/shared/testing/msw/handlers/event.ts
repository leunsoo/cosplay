import { http, HttpResponse } from 'msw';
import { mockEventList } from '@/mocks';
import type { ApiResponse } from '@/shared/api';
import type { EventListDTO } from '@/shared/api/endpoints/event';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const eventHandlers = [
  http.get(`${BASE_URL}/api/v1/events`, () => {
    const body: ApiResponse<EventListDTO> = {
      status: 'SUCCESS',
      message: '성공',
      data: mockEventList,
    };
    return HttpResponse.json(body);
  }),
];
