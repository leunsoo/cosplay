import { queryOptions } from '@tanstack/react-query';
import { getNoticeList } from './get-notice-list';
import { getNoticeDetail } from './get-notice-detail';

export const NOTICE_QUERIES = {
  all: () => ['notices'] as const,
  lists: () => [...NOTICE_QUERIES.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: NOTICE_QUERIES.lists(),
      queryFn: getNoticeList,
    }),
  details: () => [...NOTICE_QUERIES.all(), 'detail'] as const,
  detail: (id: number) =>
    queryOptions({
      queryKey: [...NOTICE_QUERIES.details(), id] as const,
      queryFn: () => getNoticeDetail(id),
      enabled: !!id,
    }),
};
