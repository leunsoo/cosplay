'use client';

import { useQuery } from '@tanstack/react-query';
import { QNA_QUERIES } from '@/shared/api';

export function useQnaDetail(qnaPostId: number) {
  const { data, isLoading, error } = useQuery(QNA_QUERIES.detail(qnaPostId));

  return { post: data?.data ?? null, isLoading, error };
}
