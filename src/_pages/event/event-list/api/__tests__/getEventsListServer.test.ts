import { describe, test, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { getEventsListServer } from '../get-events-list.server';
import { server } from '@/shared/testing/msw/server';
import type { ApiResponse } from '@/shared/api';
import type { EventListDTO } from '../get-events-list';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EVENTS_URL = `${BASE_URL}/api/v1/events`;

const createMockResponse = (data: EventListDTO): ApiResponse<EventListDTO> => ({
  status: 'SUCCESS',
  message: '성공',
  data,
});

describe('getEventsListServer', () => {
  test('serverFetch(native fetch)로 status 쿼리 파라미터를 실어 요청한다', async () => {
    // Arrange
    let requestedUrl: URL | undefined;
    server.use(
      http.get(EVENTS_URL, ({ request }) => {
        requestedUrl = new URL(request.url);
        return HttpResponse.json(createMockResponse([]));
      })
    );

    // Act
    await getEventsListServer('UPCOMING');

    // Assert
    expect(requestedUrl?.searchParams.get('status')).toBe('UPCOMING');
  });

  test('검증된 이벤트 목록을 그대로 반환한다', async () => {
    // Arrange
    const mockResponse = createMockResponse([
      {
        eventId: 1,
        title: '테스트 행사',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        startDate: '2026-01-01',
        endDate: '2026-01-02',
        location: '서울',
        price: 5000,
        status: 'ONGOING',
        category: '애니메이션',
      },
    ]);
    server.use(http.get(EVENTS_URL, () => HttpResponse.json(mockResponse)));

    // Act
    const result = await getEventsListServer('ALL');

    // Assert
    expect(result).toEqual(mockResponse);
  });

  test('HTTP 실패 응답에 대해 에러를 던진다', async () => {
    // Arrange
    server.use(
      http.get(EVENTS_URL, () =>
        HttpResponse.json(
          { status: 'ERROR', message: '서버 오류', data: null },
          { status: 500 }
        )
      )
    );

    // Act & Assert
    await expect(getEventsListServer('ALL')).rejects.toThrow();
  });
});
