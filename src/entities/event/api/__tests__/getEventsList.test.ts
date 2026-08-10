import { describe, test, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { getEventsList } from '../eventApi';
import { server } from '@/shared/testing/msw/server';
import type { ApiResponse } from '@/shared/api';
import type { EventListDTO } from '../../model';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const EVENTS_URL = `${BASE_URL}/api/v1/events`;

const createMockResponse = (data: EventListDTO): ApiResponse<EventListDTO> => ({
  status: 'SUCCESS',
  message: '성공',
  data,
});

describe('getEventsList', () => {
  test('status 쿼리 파라미터를 올바르게 실어 요청한다', async () => {
    // Arrange
    let requestedUrl: URL | undefined;
    server.use(
      http.get(EVENTS_URL, ({ request }) => {
        requestedUrl = new URL(request.url);
        return HttpResponse.json(createMockResponse([]));
      })
    );

    // Act
    await getEventsList('ONGOING');

    // Assert
    expect(requestedUrl?.searchParams.get('status')).toBe('ONGOING');
  });

  test('apiClient가 검증한 이벤트 목록을 그대로 반환한다', async () => {
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
        status: 'UPCOMING',
        category: '코스프레',
      },
    ]);
    server.use(http.get(EVENTS_URL, () => HttpResponse.json(mockResponse)));

    // Act
    const result = await getEventsList('ALL');

    // Assert
    expect(result).toEqual(mockResponse);
  });

  test('백엔드 응답이 스키마와 다르면 검증 에러를 던진다', async () => {
    // Arrange: eventId가 문자열이라 스키마(양의 정수)를 위반하는 응답
    server.use(
      http.get(EVENTS_URL, () =>
        HttpResponse.json({
          status: 'SUCCESS',
          message: '성공',
          data: [{ eventId: 'invalid' }],
        })
      )
    );

    // Act & Assert
    await expect(getEventsList('ALL')).rejects.toThrow();
  });

  test('서버 에러 응답에 대해 에러를 던진다', async () => {
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
    await expect(getEventsList('ALL')).rejects.toThrow();
  });
});
