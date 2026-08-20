'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mapProductDTOsToProducts } from '@/entities/product';
import {
  getSellerProducts,
  SELLER_QUERIES,
} from '@/shared/api/endpoints/seller';

const PAGE_SIZE = 50;

export function useSellerProducts(sellerId: string) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: SELLER_QUERIES.products(sellerId, currentPage),
    queryFn: () =>
      getSellerProducts({ sellerId, page: currentPage, size: PAGE_SIZE }),
    enabled: !!sellerId,
  });

  const products = data?.data.products
    ? mapProductDTOsToProducts(data.data.products)
    : [];
  const pagination = data?.data.pagination;

  return {
    products,
    pagination,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
  };
}
