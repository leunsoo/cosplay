'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getChatRoomList,
  CHAT_ROOM_QUERIES,
} from '@/shared/api/endpoints/product-chat';
import { transformChatRoomList } from './mapper';
import { useChatRoom } from './use-chat-room';
import { useProductChatEntry } from './use-product-chat-entry';
import { useChatHeaderInfo } from './use-chat-header-info';
import { useLeaveChatRoom } from '../api/use-leave-chat-room';
import { useAuthStore } from '@/shared/auth';
import type { ChatRoom } from './chat';

interface UseProductChatParams {
  productId?: string;
  sellerUuid?: string;
  roomId?: string;
}

export function useProductChat({
  productId,
  sellerUuid,
  roomId,
}: UseProductChatParams) {
  const userUuid = useAuthStore((state) => state.userUuid);

  // 채팅방 목록 조회
  const {
    data: chatRoomListData,
    isLoading,
    error,
  } = useQuery({
    queryKey: CHAT_ROOM_QUERIES.list(userUuid),
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
  } = useChatRoom({ userUuid });

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

  // productId+sellerUuid 진입 플로우 (기존 방 확인 → 없으면 첫 메시지 전송 시 방 생성)
  const { productDetail, isPending, isCreatingRoom, createRoomAndSend } =
    useProductChatEntry({
      productId,
      sellerUuid,
      userUuid,
      selectedRoomId,
      onRoomCreated: handleRoomSelect,
    });

  const headerProductInfo = useChatHeaderInfo({
    productId,
    productDetail,
    selectedRoomId,
    userUuid,
  });

  const { leaveRoom } = useLeaveChatRoom({
    userUuid,
    onLeft: clearSelectedRoom,
  });

  const handleLeave = () => {
    if (!selectedRoomId) return;
    leaveRoom(Number(selectedRoomId));
  };

  // 메시지 전송: pending 여부에 따라 방 생성 or 즉시 STOMP publish
  const handleMessageSend = (messageText: string) => {
    if (isPending) {
      createRoomAndSend(messageText);
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
    isPending,
    canSend: selectedRoomId !== null || isPending,
    isLoading,
    error,
    isCreatingRoom,
    // 핸들러
    handleMessageSend,
    handleSendImage,
    handleLeave,
  };
}
