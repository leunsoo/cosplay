'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resolveChatRoom } from '../api/resolve-chat-room';
import { createChatRoom } from '../api/create-chat-room';
import { CHAT_ROOM_LIST_QUERIES } from '../api/chat-room-list.query';
import { useProductDetail } from '@/entities/product';

interface UseProductChatEntryParams {
  productId?: string;
  sellerUuid?: string;
  userUuid: string;
  selectedRoomId: string | null;
  onRoomCreated: (roomId: string, firstMessage: string) => void;
}

// productId+sellerUuid로 진입했을 때: 기존 방 존재 여부 확인 → 있으면 리다이렉트,
// 없으면 첫 메시지 전송 시점에 방을 생성
export function useProductChatEntry({
  productId,
  sellerUuid,
  userUuid,
  selectedRoomId,
  onRoomCreated,
}: UseProductChatEntryParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pendingMessageRef = useRef<string>('');

  // 해당 상품의 채팅방 존재 여부 조회 (productId + sellerUuid 있을 때만)
  const { data: resolveData } = useQuery({
    queryKey: ['resolveChatRoom', productId, sellerUuid, userUuid],
    queryFn: () =>
      resolveChatRoom({
        productId: Number(productId),
        buyerUuid: userUuid,
        sellerUuid: sellerUuid!,
      }),
    enabled: !!productId && !!sellerUuid && !!userUuid,
    staleTime: Infinity,
  });

  // exists===true: 기존 채팅방 → URL을 roomId로 교체 후 활성화
  useEffect(() => {
    if (!resolveData?.data) return;
    const { exists, roomId: resolvedRoomId } = resolveData.data;
    if (exists && resolvedRoomId !== null) {
      router.replace(`/market/chat?roomId=${resolvedRoomId}`);
    }
  }, [resolveData]); // eslint-disable-line react-hooks/exhaustive-deps

  // 채팅방이 아직 없는 상태(pending) 여부를 파생으로 계산
  const pendingProductId = (() => {
    if (!productId || !sellerUuid) return null;
    if (selectedRoomId !== null) return null;
    if (resolveData?.data?.exists) return null;
    return productId;
  })();

  // productId 진입 시: 상품 상세 조회 → ChatHeader 표시 + createChatRoom 인자
  const { productDetail } = useProductDetail(
    productId ? Number(productId) : undefined
  );

  // 채팅방 생성 (첫 메시지 전송 시 호출)
  const createRoomMutation = useMutation({
    mutationFn: createChatRoom,
    onSuccess: (response) => {
      const newRoomId = response.data.id;
      // 방 생성 완료 → URL을 roomId로 교체 (이후 roomId effect가 방 활성화)
      router.replace(`/market/chat?roomId=${newRoomId}`);
      onRoomCreated(String(newRoomId), pendingMessageRef.current);
      queryClient.invalidateQueries({
        queryKey: CHAT_ROOM_LIST_QUERIES.list(userUuid),
      });
    },
  });

  // pending 상태에서 첫 메시지 전송: 방 생성 트리거
  const createRoomAndSend = (messageText: string) => {
    if (!pendingProductId) return;
    pendingMessageRef.current = messageText;
    createRoomMutation.mutate({
      productId: Number(pendingProductId),
      buyerUuid: userUuid,
      sellerUuid: sellerUuid ?? productDetail?.seller.uuid ?? '',
    });
  };

  return {
    productDetail,
    isPending: pendingProductId !== null,
    isCreatingRoom: createRoomMutation.isPending,
    createRoomAndSend,
  };
}
