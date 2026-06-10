import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getProductList } from '../productApi';
import { apiClient } from '@/shared/api';
import type { ApiResponse } from '@/shared/api';
import type { ProductListDTO } from '../../model';
import { ProductListDTOSchema } from '../../model';

// apiClient.getWithValidation을 모킹
vi.mock('@/shared/api', () => ({
  apiClient: {
    getWithValidation: vi.fn(),
  },
}));

describe('getProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  test('올바른 URL과 파라미터로 apiClient를 호출한다', async () => {
    // Arrange
    const mockParams = { page: 1 };
    const mockResponse = createMockResponse();

    vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

    // Act
    await getProductList(mockParams);

    // Assert
    expect(apiClient.getWithValidation).toHaveBeenCalledWith(
      '/api/v1/products',
      ProductListDTOSchema,
      { params: mockParams }
    );
  });

  test('apiClient로부터 받은 응답을 그대로 반환한다', async () => {
    // Arrange
    const mockResponse = createMockResponse();
    vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

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

    vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

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

    test('API 에러를 전파한다', async () => {
      // Arrange
      const apiError = new Error('네트워크 에러');
      vi.mocked(apiClient.getWithValidation).mockRejectedValue(apiError);

      // Act & Assert
      await expect(getProductList({ page: 1 })).rejects.toThrow(
        '네트워크 에러'
      );
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

      vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

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

      vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

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

      vi.mocked(apiClient.getWithValidation).mockResolvedValue(mockResponse);

      // Act
      const result = await getProductList({ page: 2 });

      // Assert
      expect(result.data.pagination.currentPage).toBe(2);
      expect(result.data.pagination.hasNext).toBe(true);
      expect(result.data.pagination.hasPrevious).toBe(true);
    });
  });
});
