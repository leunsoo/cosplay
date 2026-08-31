import { apiClient } from '../../api-client';
import { type ApiResponse } from '../../response';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockQnaDetails } from '@/mocks';
import { QnaDetailSchema, type QnaDetail } from './qna';

// getQnaDetail/getQnaDetailServer가 공통으로 쓰는 데모 모드 조회.
// id-1로 대체하던 폴백을 제거했다 — 데모 모드에서 생성한 글은 브라우저
// 메모리에만 존재해 서버 프로세스는 알 수 없으므로(mockQnaDetails가 프로세스마다
// 별개), 상세 조회 시점에 서버가 모르는 id는 엉뚱한 글(1번) 대신 정직하게
// null(존재하지 않음)을 반환한다.
export function getMockQnaDetail(
  qnaPostId: number
): ApiResponse<QnaDetail> | null {
  const detail = mockQnaDetails[qnaPostId];
  if (!detail) return null;
  return { status: 'SUCCESS', message: '성공', data: detail };
}

export function getQnaDetail(
  qnaPostId: number
): Promise<ApiResponse<QnaDetail> | null> {
  if (IS_DEMO) return Promise.resolve(getMockQnaDetail(qnaPostId));

  return apiClient.getWithValidation(
    `/api/v1/qna-posts/${qnaPostId}`,
    QnaDetailSchema
  );
}
