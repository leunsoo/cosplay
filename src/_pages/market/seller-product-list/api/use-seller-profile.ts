'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getSellerProfile,
  SELLER_QUERIES,
} from '@/shared/api/endpoints/seller';

export function useSellerProfile(sellerId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: SELLER_QUERIES.profile(sellerId),
    queryFn: () => getSellerProfile({ sellerId }),
    enabled: !!sellerId,
  });

  return { sellerProfile: data?.data ?? null, isLoading, error };
}
