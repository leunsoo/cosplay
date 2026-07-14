import { apiClient, type ApiResponse } from '@/shared/api';
import {
  QnaPostListDTOSchema,
  QnaPostDetailDTOSchema,
  type QnaPostListDTO,
  type QnaPostDetailDTO,
} from '../model/schema/qnaSchema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  mockQnaList,
  mockQnaDetails,
  createDemoQnaPost,
  updateDemoQnaPost,
  deleteDemoQnaPost,
} from '@/mocks';

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
  if (IS_DEMO) {
    const id = createDemoQnaPost(body);
    return { status: 'SUCCESS', message: '성공', data: String(id) };
  }
  return apiClient.post('/api/v1/qna-posts', body);
};

export const updateQnaPost = async (body: {
  id: number;
  title: string;
  content: string;
}): Promise<ApiResponse<string>> => {
  if (IS_DEMO) {
    updateDemoQnaPost(body);
    return { status: 'SUCCESS', message: '성공', data: String(body.id) };
  }
  return apiClient.put('/api/v1/qna-posts', body);
};

export const deleteQnaPost = async (
  qnaPostId: number
): Promise<ApiResponse<string>> => {
  if (IS_DEMO) {
    deleteDemoQnaPost(qnaPostId);
    return { status: 'SUCCESS', message: '성공', data: String(qnaPostId) };
  }
  return apiClient.delete(`/api/v1/qna-posts/${qnaPostId}`);
};
