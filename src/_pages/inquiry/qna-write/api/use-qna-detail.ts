'use client';

import { useQuery } from '@tanstack/react-query';
import { QNA_QUERIES } from '@/shared/api/endpoints/qna';

// 수정 폼에 기존 값을 채우기 위한 조회
export function useQnaDetail(qnaPostId: number) {
  const { data, isLoading, error } = useQuery(QNA_QUERIES.detail(qnaPostId));

  return { post: data?.data ?? null, isLoading, error };
}
