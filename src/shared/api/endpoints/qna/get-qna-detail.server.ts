import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockQnaDetails } from '@/mocks';
import { QnaDetailSchema, type QnaDetail } from './qna';

function getMockQnaDetail(qnaPostId: number): ApiResponse<QnaDetail> {
  const detail = mockQnaDetails[qnaPostId] ?? mockQnaDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}

// 반환값이 null이면 "게시글이 존재하지 않음"(404) — 호출부에서 notFound() 등으로 처리.
export const getQnaDetailServer = async (
  qnaPostId: number
): Promise<ApiResponse<QnaDetail> | null> => {
  if (IS_DEMO) return getMockQnaDetail(qnaPostId);

  return serverFetch(`/api/v1/qna-posts/${qnaPostId}`, QnaDetailSchema, {
    revalidate: 300,
    tags: ['qna-posts'],
    notFoundStatus: 404,
  });
};
