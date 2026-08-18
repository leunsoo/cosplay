import { http, HttpResponse } from 'msw';
import { mockProductList } from '@/mocks';
import type { ApiResponse } from '@/shared/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productHandlers = [
  http.get(`${BASE_URL}/api/v1/products`, () => {
    const body: ApiResponse<typeof mockProductList> = {
      status: 'SUCCESS',
      message: '성공',
      data: mockProductList,
    };
    return HttpResponse.json(body);
  }),
];
