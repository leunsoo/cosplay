'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoticeDetail } from '../../api/noticeApi';
import { mapNoticeDetailDTO } from '../mapper';
import type { NoticeDetail } from '../types';

export function useNoticePost(noticeId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notice', noticeId],
    queryFn: () => getNoticeDetail(noticeId),
    enabled: !!noticeId,
  });

  const notice: NoticeDetail | null = data?.data
    ? mapNoticeDetailDTO(data.data)
    : null;

  return { notice, isLoading, error };
}
