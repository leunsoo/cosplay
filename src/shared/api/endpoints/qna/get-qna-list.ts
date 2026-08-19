import { apiClient } from '../../apiClient';
import { type ApiResponse } from '../../response';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockQnaList } from '@/mocks';
import { QnaListSchema, type QnaList } from './qna';

export function getQnaList(): Promise<ApiResponse<QnaList>> {
  if (IS_DEMO)
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: mockQnaList,
    });
  return apiClient.getWithValidation('/api/v1/qna-posts', QnaListSchema);
}
