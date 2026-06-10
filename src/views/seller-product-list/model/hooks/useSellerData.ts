import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mapProductDTOsToProducts } from '@/entities/product';
import { getSellerProfile, getSellerProducts } from '../../api';
import { mapSellerProfileDTOToSellerProfile } from '../mapper';

const PAGE_SIZE = 50;

export function useSellerData(sellerId: string) {
  const [currentPage, setCurrentPage] = useState(1);

  console.log(sellerId);
  // 판매자 프로필
  const {
    data: sellerData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['seller', sellerId],
    queryFn: () => getSellerProfile({ sellerId }),
    enabled: !!sellerId,
  });

  console.log('profileError:' + profileError);

  // 판매자 상품 리스트
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['sellerProducts', sellerId, currentPage],
    queryFn: () =>
      getSellerProducts({
        sellerId,
        page: currentPage,
        size: PAGE_SIZE,
      }),
    enabled: !!sellerId,
  });

  console.log('productError:' + productsError);
  // 매핑
  const sellerProfile = sellerData?.data
    ? mapSellerProfileDTOToSellerProfile(sellerData.data)
    : null;

  // 매핑
  const products = productsData?.data.products
    ? mapProductDTOsToProducts(productsData.data.products)
    : [];

  const pagination = productsData?.data.pagination;

  return {
    sellerProfile,
    products,
    pagination,
    currentPage,
    setCurrentPage,
    isLoading: isLoadingProfile || isLoadingProducts,
    error: profileError || productsError,
  };
}
