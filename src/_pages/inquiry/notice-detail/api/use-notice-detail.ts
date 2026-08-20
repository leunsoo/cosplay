'use client';

import { useQuery } from '@tanstack/react-query';
import { NOTICE_QUERIES } from '@/shared/api/endpoints/notice';

export function useNoticeDetail(noticeId: number) {
  const { data, isLoading, error } = useQuery(NOTICE_QUERIES.detail(noticeId));

  return { notice: data?.data ?? null, isLoading, error };
}
