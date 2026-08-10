import { apiClient } from '../apiClient';
import { type ApiResponse } from '../response';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoQna } from '@/mocks';

export function updateQna(body: {
  id: number;
  title: string;
  content: string;
}): Promise<ApiResponse<string>> {
  if (IS_DEMO) {
    updateDemoQna(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(body.id),
    });
  }
  return apiClient.put('/api/v1/qna-posts', body);
}
