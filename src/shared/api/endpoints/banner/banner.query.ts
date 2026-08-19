export const BANNER_QUERIES = {
  all: () => ['banners'] as const,
  list: () => BANNER_QUERIES.all(),
};
