'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  getChatMessages,
  markMessagesAsRead,
  type StompReceivePayload,
} from '@/shared/api/endpoints/product-chat';
import { mapMessageDTOToMessage, mapMessageDTOsToMessages } from './mapper';
import type { Message } from './chat';

let receivedMessageCounter = 0;

interface UseChatMessagesParams {
  userUuid: string;
  selectedRoomId: string | null;
}

// 선택된 방의 메시지 목록: HTTP 히스토리 로드 + 읽음 처리 + 실시간 수신 반영
export function useChatMessages({
  userUuid,
  selectedRoomId,
}: UseChatMessagesParams) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadedRoomId, setLoadedRoomId] = useState<string | null>(null);

  // STOMP/데모로 수신한 실시간 메시지를 목록에 반영 (HTTP MessageDTO와 필드가 동일해 mapper 재사용)
  const receiveMessage = useCallback(
    (payload: StompReceivePayload['message']) => {
      const newMessage: Message = {
        ...mapMessageDTOToMessage(payload, userUuid),
        id: `live-${++receivedMessageCounter}`,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [userUuid]
  );

  // 방 진입 시 기존 메시지 로드 + 읽음 처리
  useEffect(() => {
    if (!selectedRoomId) return;

    setMessages([]);
    setLoadedRoomId(null);

    getChatMessages({ roomId: Number(selectedRoomId), userUuid })
      .then((response) => {
        if (response.data) {
          setMessages(mapMessageDTOsToMessages(response.data, userUuid));
        }

        // 읽음 처리 (fire-and-forget)
        markMessagesAsRead({
          roomId: Number(selectedRoomId),
          readerUuid: userUuid,
        }).catch(() => {});

        setLoadedRoomId(selectedRoomId);
      })
      .catch(() => {
        // 메시지 로드 실패 시 빈 상태 유지
      });
  }, [selectedRoomId]); // eslint-disable-line react-hooks/exhaustive-deps

  return { messages, receiveMessage, loadedRoomId };
}
