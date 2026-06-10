'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoticeList } from '../../api/noticeApi';
import { mapNoticeSummaryDTO } from '../mapper';
import type { NoticeSummary } from '../types';

export function useNoticeList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notices'],
    queryFn: () => getNoticeList(),
  });

  const notices: NoticeSummary[] = data?.data.map(mapNoticeSummaryDTO) ?? [];

  return { notices, isLoading, error };
}
