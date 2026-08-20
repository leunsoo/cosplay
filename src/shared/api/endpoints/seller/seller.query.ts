export const SELLER_QUERIES = {
  all: () => ['sellers'] as const,

  profiles: () => [...SELLER_QUERIES.all(), 'profile'] as const,
  profile: (sellerId: string) =>
    [...SELLER_QUERIES.profiles(), sellerId] as const,

  products: (sellerId: string, page: number) =>
    [...SELLER_QUERIES.all(), 'products', sellerId, page] as const,
};
