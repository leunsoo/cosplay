import { describe, test, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { getProductList, type ProductListDTO } from '../get-product-list';
import type { ApiResponse } from '@/shared/api';
import { server } from '@/shared/testing/msw/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PRODUCTS_URL = `${BASE_URL}/api/v1/products`;

describe('getProductList', () => {
  // 테스트 헬퍼 함수: 목 응답 생성
  const createMockResponse = (
    overrides?: Partial<ProductListDTO>
  ): ApiResponse<ProductListDTO> => ({
    status: 'SUCCESS',
    message: '성공',
    data: {
      products: [
        {
          id: 1,
          title: '테스트 상품',
          price: 10000,
          mainImageUrl: 'https://example.com/image.jpg',
          createdAt: '2024-01-01T00:00:00Z',
          badges: [{ label: '거래제안가능' }],
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 10,
        totalElements: 100,
        pageSize: 10,
        hasNext: true,
        hasPrevious: false,
      },
      ...overrides,
    },
  });

  test('올바른 URL과 page 파라미터로 요청한다', async () => {
    // Arrange
    let requestedUrl: URL | undefined;
    server.use(
      http.get(PRODUCTS_URL, ({ request }) => {
        requestedUrl = new URL(request.url);
        return HttpResponse.json(createMockResponse());
      })
    );

    // Act
    await getProductList({ page: 1 });

    // Assert
    expect(requestedUrl?.pathname).toBe('/api/v1/products');
    expect(requestedUrl?.searchParams.get('page')).toBe('1');
  });

  test('apiClient로부터 받은 응답을 그대로 반환한다', async () => {
    // Arrange
    const mockResponse = createMockResponse();
    server.use(http.get(PRODUCTS_URL, () => HttpResponse.json(mockResponse)));

    // Act
    const result = await getProductList({ page: 1 });

    // Assert
    expect(result).toEqual(mockResponse);
  });

  test('빈 상품 목록을 처리한다', async () => {
    // Arrange
    const mockResponse = createMockResponse({
      products: [],
      pagination: {
        currentPage: 100,
        totalPages: 10,
        totalElements: 100,
        pageSize: 10,
        hasNext: false,
        hasPrevious: true,
      },
    });
    server.use(http.get(PRODUCTS_URL, () => HttpResponse.json(mockResponse)));

    // Act
    const result = await getProductList({ page: 100 });

    // Assert
    expect(result.data.products).toHaveLength(0);
    expect(result.data.pagination.hasNext).toBe(false);
  });

  describe('에러 케이스', () => {
    test('잘못된 페이지 번호(0)에 대해 에러를 던진다', async () => {
      // Arrange
      const invalidParams = { page: 0 };

      // Act & Assert
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(getProductList(invalidParams as any)).rejects.toThrow();
    });

    test('음수 페이지 번호에 대해 에러를 던진다', async () => {
      // Arrange
      const invalidParams = { page: -1 };

      // Act & Assert
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(getProductList(invalidParams as any)).rejects.toThrow();
    });

    test('서버 에러 응답(500)에 대해 에러를 던진다', async () => {
      // Arrange
      server.use(
        http.get(PRODUCTS_URL, () =>
          HttpResponse.json(
            { status: 'ERROR', message: '서버 오류', data: null },
            { status: 500 }
          )
        )
      );

      // Act & Assert
      await expect(getProductList({ page: 1 })).rejects.toThrow();
    });

    test('네트워크 에러를 전파한다', async () => {
      // Arrange
      server.use(http.get(PRODUCTS_URL, () => HttpResponse.error()));

      // Act & Assert
      await expect(getProductList({ page: 1 })).rejects.toThrow();
    });
  });

  describe('엣지 케이스', () => {
    test('여러 개의 뱃지를 가진 상품을 처리한다', async () => {
      // Arrange
      const mockResponse = createMockResponse({
        products: [
          {
            id: 1,
            title: '다중 뱃지 상품',
            price: 30000,
            mainImageUrl: 'https://example.com/image.jpg',
            createdAt: '2024-01-01T00:00:00Z',
            badges: [{ label: '거래제안가능' }, { label: '배송비포함' }],
          },
        ],
      });
      server.use(http.get(PRODUCTS_URL, () => HttpResponse.json(mockResponse)));

      // Act
      const result = await getProductList({ page: 1 });

      // Assert
      expect(result.data.products[0].badges).toHaveLength(2);
      expect(result.data.products[0].badges[0].label).toBe('거래제안가능');
      expect(result.data.products[0].badges[1].label).toBe('배송비포함');
    });

    test('뱃지가 없는 상품을 처리한다', async () => {
      // Arrange
      const mockResponse = createMockResponse({
        products: [
          {
            id: 1,
            title: '뱃지 없는 상품',
            price: 10000,
            mainImageUrl: 'https://example.com/image.jpg',
            createdAt: '2024-01-01T00:00:00Z',
            badges: [],
          },
        ],
      });
      server.use(http.get(PRODUCTS_URL, () => HttpResponse.json(mockResponse)));

      // Act
      const result = await getProductList({ page: 1 });

      // Assert
      expect(result.data.products[0].badges).toHaveLength(0);
    });

    test('여러 페이지의 데이터를 올바르게 반환한다', async () => {
      // Arrange
      const mockResponse = createMockResponse({
        pagination: {
          currentPage: 2,
          totalPages: 10,
          totalElements: 100,
          pageSize: 10,
          hasNext: true,
          hasPrevious: true,
        },
      });
      server.use(http.get(PRODUCTS_URL, () => HttpResponse.json(mockResponse)));

      // Act
      const result = await getProductList({ page: 2 });

      // Assert
      expect(result.data.pagination.currentPage).toBe(2);
      expect(result.data.pagination.hasNext).toBe(true);
      expect(result.data.pagination.hasPrevious).toBe(true);
    });
  });
});
