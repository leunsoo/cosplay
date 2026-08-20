import { apiClient } from '../../api-client';
import { type ApiResponse } from '../../response';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockQnaDetails } from '@/mocks';
import { QnaDetailSchema, type QnaDetail } from './qna';

export function getQnaDetail(
  qnaPostId: number
): Promise<ApiResponse<QnaDetail>> {
  if (IS_DEMO) {
    const detail = mockQnaDetails[qnaPostId] ?? mockQnaDetails[1];
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: detail,
    });
  }

  return apiClient.getWithValidation(
    `/api/v1/qna-posts/${qnaPostId}`,
    QnaDetailSchema
  );
}
