import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { deleteDemoQna } from '@/mocks';

export const deleteQna = (qnaPostId: number): Promise<ApiResponse<string>> => {
  if (IS_DEMO) {
    deleteDemoQna(qnaPostId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(qnaPostId),
    });
  }
  return apiClient.delete(`/api/v1/qna-posts/${qnaPostId}`);
};
