import { apiClient, type ApiResponse } from '@/shared/api';
import {
  QnaPostListDTOSchema,
  QnaPostDetailDTOSchema,
  type QnaPostListDTO,
  type QnaPostDetailDTO,
} from '../model/schema/qnaSchema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockQnaList, mockQnaDetails } from '@/mocks';

export const getQnaList = async (): Promise<ApiResponse<QnaPostListDTO>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockQnaList };
  return apiClient.getWithValidation('/api/v1/qna-posts', QnaPostListDTOSchema);
};

export const getQnaPost = async (
  qnaPostId: number
): Promise<ApiResponse<QnaPostDetailDTO>> => {
  if (IS_DEMO) {
    const detail = mockQnaDetails[qnaPostId] ?? mockQnaDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }

  return apiClient.getWithValidation(
    `/api/v1/qna-posts/${qnaPostId}`,
    QnaPostDetailDTOSchema
  );
};

export const createQnaPost = async (body: {
  title: string;
  content: string;
}): Promise<ApiResponse<string>> => {
  return apiClient.post('/api/v1/qna-posts', body);
};

export const updateQnaPost = async (body: {
  id: number;
  title: string;
  content: string;
}): Promise<ApiResponse<string>> => {
  return apiClient.put('/api/v1/qna-posts', body);
};

export const deleteQnaPost = async (
  qnaPostId: number
): Promise<ApiResponse<string>> => {
  return apiClient.delete(`/api/v1/qna-posts/${qnaPostId}`);
};
