'use client';

import { useQuery } from '@tanstack/react-query';
import {
  resolveChatRoom,
  CHAT_ROOM_QUERIES,
} from '@/shared/api/endpoints/product-chat';

interface UseResolveChatRoomParams {
  productId?: string;
  sellerUuid?: string;
  userUuid: string;
}

// 상품+판매자 조합의 채팅방 존재 여부 조회
export function useResolveChatRoom({
  productId,
  sellerUuid,
  userUuid,
}: UseResolveChatRoomParams) {
  return useQuery({
    queryKey: CHAT_ROOM_QUERIES.resolve(
      Number(productId),
      userUuid,
      sellerUuid ?? ''
    ),
    queryFn: () =>
      resolveChatRoom({
        productId: Number(productId),
        buyerUuid: userUuid,
        sellerUuid: sellerUuid!,
      }),
    enabled: !!productId && !!sellerUuid && !!userUuid,
    staleTime: Infinity,
  });
}
