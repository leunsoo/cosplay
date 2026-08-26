import { queryOptions } from '@tanstack/react-query';
import { getNoticeList } from './get-notice-list';

export const NOTICE_QUERIES = {
  all: () => ['notices'] as const,
  lists: () => [...NOTICE_QUERIES.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: NOTICE_QUERIES.lists(),
      queryFn: getNoticeList,
    }),
};
