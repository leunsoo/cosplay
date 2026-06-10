'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useChatStomp } from '@/features/product-trade-chat';
import {
  getChatMessages,
  markMessagesAsRead,
  mapMessageDTOsToMessages,
  formatChatTimestamp,
  type ChatRoom,
  type Message,
  type StompReceivePayload,
} from '@/features/product-trade-chat';

interface UseChatRoomParams {
  userUuid: string;
  chatRooms: ChatRoom[];
}

let stompMessageCounter = 0;

//방 선택·메시지 상태·API 호출 훅
export function useChatRoom({ userUuid, chatRooms }: UseChatRoomParams) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();

  // pending 첫 메시지: 방 생성 후 로드 완료 시점에서 전송 (타이밍 보장용)
  const pendingFirstMessageRef = useRef<string | null>(null);

  // selectedRoomId로 상대방 정보 조회
  const selectedRoom = chatRooms.find((room) => room.id === selectedRoomId);
  const opponentInfo = {
    userName: selectedRoom?.userName ?? '',
    userAvatar: selectedRoom?.userAvatar ?? '',
  };

  // STOMP 수신 메시지 핸들러
  const handleRoomMessage = useCallback(
    (payload: StompReceivePayload['message']) => {
      const isSender = payload.senderUuid === userUuid;
      const isImage = payload.type === 'IMAGE';
      const newMessage: Message = {
        id: `stomp-${++stompMessageCounter}`,
        type: isSender ? 'sender' : 'receiver',
        message: isImage ? undefined : payload.message,
        imageUrl: isImage ? payload.message : undefined,
        timestamp: formatChatTimestamp(payload.createdAt),
        rawTimestamp: payload.createdAt,
        userName: isSender ? undefined : opponentInfo.userName,
        userAvatar: isSender ? undefined : opponentInfo.userAvatar,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [userUuid, opponentInfo.userName, opponentInfo.userAvatar]
  );

  // 목록 업데이트 핸들러 → React Query cache 무효화
  const handleListUpdate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['chatRooms', userUuid] });
  }, [queryClient, userUuid]);

  // useChatStomp 연결
  const { sendMessage } = useChatStomp({
    userUuid,
    selectedRoomId,
    onRoomMessage: handleRoomMessage,
    onListUpdate: handleListUpdate,
  });

  // 방 진입 시 기존 메시지 로드
  useEffect(() => {
    if (!selectedRoomId) return;

    setMessages([]);

    getChatMessages({ roomId: Number(selectedRoomId), userUuid })
      .then((response) => {
        if (response.data) {
          setMessages(
            mapMessageDTOsToMessages(response.data, userUuid, opponentInfo)
          );
        }

        // 읽음 처리 (fire-and-forget)
        markMessagesAsRead({
          roomId: Number(selectedRoomId),
          readerUuid: userUuid,
        }).catch(() => {});

        // pending 첫 메시지가 있으면 로드 완료 후 전송
        // (STOMP 구독이 활성화된 후 publish → 수신 메시지로 자동 표시)
        if (pendingFirstMessageRef.current) {
          const text = pendingFirstMessageRef.current;
          pendingFirstMessageRef.current = null;

          sendMessage(Number(selectedRoomId), {
            senderUuid: userUuid,
            message: text,
            type: 'TEXT',
          });
        }
      })
      .catch(() => {
        // 메시지 로드 실패 시 빈 상태 유지
      });
  }, [selectedRoomId]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setMessages([]);
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
