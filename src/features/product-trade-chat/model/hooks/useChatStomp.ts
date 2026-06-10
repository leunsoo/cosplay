'use client';

import { useEffect, useCallback } from 'react';
import { stompClient } from '@/shared/stomp';
import {
  StompMessagePayloadSchema,
  StompReceivePayloadSchema,
  type StompMessagePayload,
  type StompReceivePayload,
} from '../schema/stompMessage';

interface UseChatStompParams {
  userUuid: string;
  selectedRoomId: string | null;
  onRoomMessage: (payload: StompReceivePayload['message']) => void;
  onListUpdate: () => void;
}

// STOMP 연결·구독·발행 훅
export function useChatStomp({
  userUuid,
  selectedRoomId,
  onRoomMessage,
  onListUpdate,
}: UseChatStompParams) {
  // Effect 1: STOMP 연결 수명주기
  useEffect(() => {
    stompClient.connect();
    return () => stompClient.disconnect();
  }, []);

  // Effect 2: 유저 채팅 목록 업데이트 구독
  useEffect(() => {
    if (!userUuid) return;

    const unsubscribe = stompClient.subscribe({
      destination: `/topic/chat.lists.${userUuid}`,
      callback: () => {
        onListUpdate();
      },
    });

    return () => unsubscribe();
  }, [userUuid, onListUpdate]);

  // Effect 3: 선택된 방의 메시지 구독 (roomId 변경 시 자동 교체)
  useEffect(() => {
    if (!selectedRoomId) return;

    const unsubscribe = stompClient.subscribe({
      destination: `/topic/chat.rooms.${selectedRoomId}`,
      callback: (message) => {
        const result = StompReceivePayloadSchema.safeParse(
          JSON.parse(message.body)
        );
        if (result.success) {
          onRoomMessage(result.data.message);
        }
      },
    });

    return () => unsubscribe();
  }, [selectedRoomId, onRoomMessage]);

  // publish 래퍼: roomId를 destination 경로에 포함
  const sendMessage = useCallback(
    (roomId: number, payload: StompMessagePayload): boolean => {
      const validated = StompMessagePayloadSchema.parse(payload);
      try {
        stompClient.publish({
          destination: `/app/chat.rooms.${roomId}.send`,
          body: JSON.stringify(validated),
        });
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  return { sendMessage };
}
