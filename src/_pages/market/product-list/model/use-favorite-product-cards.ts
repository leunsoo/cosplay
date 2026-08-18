'use client';

import { useQuery } from '@tanstack/react-query';
import { FAVORITE_PRODUCT_QUERIES } from '@/shared/api/favorite-product';
import { mapFavoriteProductToProduct } from './mapper';

interface UseFavoriteProductCardsParams {
  uuid: string;
}

// 모바일 찜 목록 뷰 전용: 전체 목록을 카드 배열로만 반환 (페이지네이션/제거 없음)
export function useFavoriteProductCards({
  uuid,
}: UseFavoriteProductCardsParams) {
  const { data } = useQuery({
    ...FAVORITE_PRODUCT_QUERIES.list(uuid),
    staleTime: 0,
    gcTime: 0,
  });

  const products = (data?.data.products ?? []).map(mapFavoriteProductToProduct);

  return { products };
}
