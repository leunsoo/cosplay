'use client';

import { useQuery } from '@tanstack/react-query';
import { QNA_QUERIES } from '@/shared/api/endpoints/qna';

export function useQnaList() {
  const { data, isLoading, error } = useQuery(QNA_QUERIES.list());

  return { qnaPosts: data?.data ?? [], isLoading, error };
}
