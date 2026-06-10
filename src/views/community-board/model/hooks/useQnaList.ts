'use client';

import { useQuery } from '@tanstack/react-query';
import { getQnaList } from '../../api/qnaApi';
import { mapQnaPostSummaryDTO } from '../mapper';
import type { QnaPostSummary } from '../types';

export function useQnaList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['qna-posts'],
    queryFn: () => getQnaList(),
  });

  const qnaPosts: QnaPostSummary[] = data?.data.map(mapQnaPostSummaryDTO) ?? [];

  return { qnaPosts, isLoading, error };
}
