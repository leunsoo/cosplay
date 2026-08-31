import { queryOptions } from '@tanstack/react-query';
import { getQnaList } from './get-qna-list';
import { getQnaDetail } from './get-qna-detail';

export const QNA_QUERIES = {
  all: () => ['qna-posts'] as const,
  lists: () => [...QNA_QUERIES.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: QNA_QUERIES.lists(),
      queryFn: getQnaList,
    }),
  details: () => [...QNA_QUERIES.all(), 'detail'] as const,
  detail: (id: number) =>
    queryOptions({
      queryKey: [...QNA_QUERIES.details(), id] as const,
      queryFn: () => getQnaDetail(id),
      enabled: !!id,
    }),
};
