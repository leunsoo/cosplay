export const PRODUCT_QUERIES = {
  all: () => ['products'] as const,

  lists: () => [...PRODUCT_QUERIES.all(), 'list'] as const,
  list: (page: number) => [...PRODUCT_QUERIES.lists(), page] as const,

  searches: () => [...PRODUCT_QUERIES.all(), 'search'] as const,
  search: (keyword: string, page: number) =>
    [...PRODUCT_QUERIES.searches(), keyword, page] as const,

  details: () => [...PRODUCT_QUERIES.all(), 'detail'] as const,
  detail: (productId: number) =>
    [...PRODUCT_QUERIES.details(), productId] as const,
};
