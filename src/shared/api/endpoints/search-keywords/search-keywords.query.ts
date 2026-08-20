export const SEARCH_KEYWORDS_QUERIES = {
  all: () => ['search-keywords'] as const,
  list: (uuid: string) => [...SEARCH_KEYWORDS_QUERIES.all(), uuid] as const,
};
