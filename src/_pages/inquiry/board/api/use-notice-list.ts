'use client';

import { useQuery } from '@tanstack/react-query';
import { NOTICE_QUERIES } from '@/shared/api/notice';

export function useNoticeList() {
  const { data, isLoading, error } = useQuery(NOTICE_QUERIES.list());

  return { notices: data?.data ?? [], isLoading, error };
}
