'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getChatRoomList,
  createChatRoom,
  getChatRoom,
  resolveChatRoom,
  leaveChatRoom,
  transformChatRoomList,
  type ChatRoom,
} from '@/features/product-trade-chat';
import { useAuthStore } from '@/shared/auth';
import { getProductDetail } from '@/entities/product';
import { useChatRoom } from './useChatRoom';

interface UseChatViewParams {
  productId?: string;
  sellerUuid?: string;
  roomId?: string;
}

export function useChatView({
  productId,
  sellerUuid,
  roomId,
}: UseChatViewParams) {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const queryClient = useQueryClient();
  const pendingMessageRef = useRef<string>('');

  // 채팅방 목록 조회
  const {
    data: chatRoomListData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chatRooms', userUuid],
    queryFn: () => getChatRoomList({ userUuid }),
  });

  const chatRooms: ChatRoom[] = chatRoomListData?.data
    ? transformChatRoomList(chatRoomListData.data)
    : [];

  // STOMP 연결 + 방 선택·메시지 상태 관리
  const {
    selectedRoomId,
    messages,
    handleRoomSelect,
    handleSend,
    handleSendImage,
    clearSelectedRoom,
  } = useChatRoom({ userUuid, chatRooms });

  // roomId로 직접 진입 시 즉시 활성화, roomId 제거 시 선택 초기화
  // userUuid가 준비된 후에만 방 입장 (새로고침 시 auth 로드 타이밍 보장)
  useEffect(() => {
    if (!userUuid) return;
    if (roomId && !productId) {
      handleRoomSelect(roomId);
    } else if (!roomId && !productId) {
      clearSelectedRoom();
    }
  }, [roomId, userUuid]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const { data: productDetailData } = useQuery({
    queryKey: ['product', Number(productId)],
    queryFn: () => getProductDetail({ productId: Number(productId!) }),
    enabled: !!productId,
  });

  // 방 선택 시: 채팅방 상품 정보 조회 → ChatHeader 표시
  // roomId 기반 진입이거나 사이드바에서 방 선택 시 사용
  const { data: chatRoomDetailData } = useQuery({
    queryKey: ['chatRoom', selectedRoomId, userUuid],
    queryFn: () => getChatRoom({ roomId: Number(selectedRoomId!), userUuid }),
    enabled: !!selectedRoomId && !!userUuid && !productId,
  });

  // ChatHeader 표시용 상품 정보 결정
  // 우선순위: productDetail(productId 진입, 가격 포함) > chatRoomDetail(roomId 진입/사이드바) > 기본값
  const headerProductInfo = (() => {
    if (productId && productDetailData?.data) {
      return {
        productImage: productDetailData.data.product.mainImageUrl,
        productTitle: productDetailData.data.product.title,
        productPrice: productDetailData.data.product.price,
        productId: Number(productId),
        opponentUuid: productDetailData.data.seller.uuid,
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
  })();

  // 채팅방 나가기
  const leaveRoomMutation = useMutation({
    mutationFn: (roomId: number) => leaveChatRoom({ roomId }, { userUuid }),
    onSuccess: () => {
      clearSelectedRoom();
      queryClient.invalidateQueries({ queryKey: ['chatRooms', userUuid] });
      queryClient.invalidateQueries({ queryKey: ['resolveChatRoom'] });
      router.replace('/market/chat');
    },
    onError: (error) => {
      console.error('[leaveChatRoom] API 오류:', error);
    },
  });

  const handleLeave = () => {
    if (!selectedRoomId) return;
    leaveRoomMutation.mutate(Number(selectedRoomId));
  };

  // 채팅방 생성 (첫 메시지 전송 시 호출)
  const createRoomMutation = useMutation({
    mutationFn: createChatRoom,
    onSuccess: (response) => {
      const newRoomId = response.data.id;
      // 방 생성 완료 → URL을 roomId로 교체 (이후 roomId effect가 방 활성화)
      router.replace(`/market/chat?roomId=${newRoomId}`);
      // 첫 메시지는 roomId effect에서 handleRoomSelect 호출 후 전송
      handleRoomSelect(String(newRoomId), pendingMessageRef.current);
      queryClient.invalidateQueries({ queryKey: ['chatRooms', userUuid] });
    },
  });

  // 메시지 전송: pending 여부에 따라 방 생성 or 즉시 STOMP publish
  const handleMessageSend = (messageText: string) => {
    if (pendingProductId) {
      pendingMessageRef.current = messageText;
      createRoomMutation.mutate({
        productId: Number(pendingProductId),
        buyerUuid: userUuid,
        sellerUuid: sellerUuid ?? productDetailData?.data?.seller.uuid ?? '',
      });
    } else {
      handleSend(messageText);
    }
  };

  const chatRoomsWithActive = chatRooms.map((room) => ({
    ...room,
    isActive: room.id === selectedRoomId,
  }));

  return {
    // 데이터
    chatRoomsWithActive,
    messages,
    selectedRoomId,
    headerProductInfo,
    // 상태 플래그
    isPending: pendingProductId !== null,
    canSend: selectedRoomId !== null || pendingProductId !== null,
    isLoading,
    error,
    isCreatingRoom: createRoomMutation.isPending,
    // 핸들러
    handleMessageSend,
    handleSendImage,
    handleLeave,
  };
}
