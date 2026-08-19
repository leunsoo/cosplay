export const RECENTLY_VIEWED_QUERIES = {
  all: () => ['recently-viewed'] as const,
  list: (uuid: string) => [...RECENTLY_VIEWED_QUERIES.all(), uuid] as const,
};
