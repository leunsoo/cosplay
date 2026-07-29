import { apiClient } from '../apiClient';
import { type ApiResponse } from '../response';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoQna } from '@/mocks';

export function createQna(body: {
  title: string;
  content: string;
}): Promise<ApiResponse<string>> {
  if (IS_DEMO) {
    const id = createDemoQna(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(id),
    });
  }
  return apiClient.post('/api/v1/qna-posts', body);
}
