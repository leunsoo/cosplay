'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_ROOM_LIST_QUERIES } from '@/shared/api/endpoints/product-chat';
import { useChatStomp, type StompMessagePayload } from '../api/use-chat-stomp';
import { useChatMessages } from './use-chat-messages';
import type { ChatRoom } from './chat';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { sendDemoMessage } from '@/mocks';

interface UseChatRoomParams {
  userUuid: string;
  chatRooms: ChatRoom[];
}

// 방 선택 상태 + 메시지 전송 오케스트레이션 훅
export function useChatRoom({ userUuid, chatRooms }: UseChatRoomParams) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // pending 첫 메시지: 방 생성 후 로드 완료 시점에서 전송 (타이밍 보장용)
  const pendingFirstMessageRef = useRef<string | null>(null);

  const { messages, receiveMessage, loadedRoomId } = useChatMessages({
    userUuid,
    selectedRoomId,
    chatRooms,
  });

  // 목록 업데이트 핸들러 → React Query cache 무효화
  const handleListUpdate = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: CHAT_ROOM_LIST_QUERIES.list(userUuid),
    });
  }, [queryClient, userUuid]);

  // useChatStomp 연결
  const { sendMessage: publishMessage } = useChatStomp({
    userUuid,
    selectedRoomId,
    onRoomMessage: receiveMessage,
    onListUpdate: handleListUpdate,
  });

  // 데모 모드에서는 STOMP publish가 no-op이므로, 보낸 메시지를 로컬에 즉시 반영한다
  // (id는 receiveMessage가 자체 카운터로 재생성하므로 값은 무관)
  const sendMessage = useCallback(
    (roomId: number, payload: StompMessagePayload) => {
      publishMessage(roomId, payload);

      if (IS_DEMO) {
        sendDemoMessage(roomId, payload);
        receiveMessage({
          id: 0,
          roomId,
          senderUuid: payload.senderUuid,
          message: payload.message,
          type: payload.type,
          isRead: false,
          createdAt: new Date().toISOString(),
        });
      }
    },
    [publishMessage, receiveMessage]
  );

  // 메시지 로드가 끝나면(방 생성 직후 진입 시) 대기 중인 첫 메시지 전송
  // STOMP 구독이 활성화된 후 publish → 수신 메시지로 자동 표시
  useEffect(() => {
    if (!loadedRoomId || !pendingFirstMessageRef.current) return;
    const text = pendingFirstMessageRef.current;
    pendingFirstMessageRef.current = null;
    sendMessage(Number(loadedRoomId), {
      senderUuid: userUuid,
      message: text,
      type: 'TEXT',
    });
  }, [loadedRoomId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 방 선택 핸들러
  // firstMessage: pending 방 생성 후 첫 메시지 전송용 (로드 완료 후 자동 전송)
  const handleRoomSelect = useCallback(
    (roomId: string, firstMessage?: string) => {
      if (firstMessage) {
        pendingFirstMessageRef.current = firstMessage;
      }
      setSelectedRoomId(roomId);
    },
    []
  );

  // 메시지 전송 핸들러 (기존 방, 구독 활성 상태)
  const handleSend = useCallback(
    (messageText: string) => {
      if (!selectedRoomId) return;
      sendMessage(Number(selectedRoomId), {
        senderUuid: userUuid,
        message: messageText,
        type: 'TEXT',
      });
    },
    [selectedRoomId, userUuid, sendMessage]
  );

  // 이미지 전송 핸들러 (imageUrl은 MessageInput에서 업로드 완료 후 전달)
  const handleSendImage = useCallback(
    (imageUrl: string) => {
      if (!selectedRoomId) return;
      sendMessage(Number(selectedRoomId), {
        senderUuid: userUuid,
        message: imageUrl,
        type: 'IMAGE',
      });
    },
    [selectedRoomId, userUuid, sendMessage]
  );

  const clearSelectedRoom = useCallback(() => {
    setSelectedRoomId(null);
  }, []);

  return {
    selectedRoomId,
    messages,
    handleRoomSelect,
    handleSend,
    handleSendImage,
    clearSelectedRoom,
  };
}
