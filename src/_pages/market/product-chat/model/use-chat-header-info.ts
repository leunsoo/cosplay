'use client';

import { useQuery } from '@tanstack/react-query';
import { getChatRoom } from '@/shared/api/endpoints/product-chat';
import type { ProductDetailResponseDTO } from '@/shared/api/endpoints/product';
import type { ChatProductInfo } from './chat';

interface UseChatHeaderInfoParams {
  productId?: string;
  productDetail: ProductDetailResponseDTO | null;
  selectedRoomId: string | null;
  userUuid: string;
}

// ChatHeader 표시용 상품 정보 결정
// 우선순위: productDetail(productId 진입, 가격 포함) > chatRoomDetail(roomId 진입/사이드바) > 기본값
export function useChatHeaderInfo({
  productId,
  productDetail,
  selectedRoomId,
  userUuid,
}: UseChatHeaderInfoParams): ChatProductInfo {
  // 방 선택 시: 채팅방 상품 정보 조회 → ChatHeader 표시
  // roomId 기반 진입이거나 사이드바에서 방 선택 시 사용
  const { data: chatRoomDetailData } = useQuery({
    queryKey: ['chatRoom', selectedRoomId, userUuid],
    queryFn: () => getChatRoom({ roomId: Number(selectedRoomId!), userUuid }),
    enabled: !!selectedRoomId && !!userUuid && !productId,
  });

  if (productId && productDetail) {
    return {
      productImage: productDetail.product.mainImageUrl,
      productTitle: productDetail.product.title,
      productPrice: productDetail.product.price,
      productId: Number(productId),
      opponentUuid: productDetail.seller.uuid,
    };
  }
  if (chatRoomDetailData?.data) {
    return {
      productImage: chatRoomDetailData.data.productPhotoUrl,
      productTitle: chatRoomDetailData.data.productTitle,
      productPrice: chatRoomDetailData.data.productPrice,
      productId: chatRoomDetailData.data.productId,
      opponentUuid: chatRoomDetailData.data.opponentUuid,
    };
  }
  return { productImage: '', productTitle: '채팅', productPrice: undefined };
}
