import { queryOptions } from '@tanstack/react-query';
import { getQnaList } from './get-qna-list';

export const QNA_QUERIES = {
  all: () => ['qna-posts'] as const,
  lists: () => [...QNA_QUERIES.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: QNA_QUERIES.lists(),
      queryFn: getQnaList,
    }),
};
