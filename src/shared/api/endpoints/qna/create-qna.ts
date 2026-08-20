import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { createDemoQna } from '@/mocks';

export interface CreateQnaBody {
  title: string;
  content: string;
}

export const createQna = (
  body: CreateQnaBody
): Promise<ApiResponse<string>> => {
  if (IS_DEMO) {
    const id = createDemoQna(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(id),
    });
  }
  return apiClient.post('/api/v1/qna-posts', body);
};
