'use client';

import { useEffect, useCallback } from 'react';
import { z } from 'zod';
import { stompClient } from '@/shared/stomp';

// STOMP publish body (roomId는 destination 경로에 포함)
export const StompMessagePayloadSchema = z.discriminatedUnion('type', [
  z.object({
    senderUuid: z.string().min(1),
    message: z.string().min(1),
    type: z.literal('TEXT'),
  }),
  z.object({
    senderUuid: z.string().min(1),
    message: z.string().min(1), // imageUrl을 message 필드로 전달
    type: z.literal('IMAGE'),
  }),
]);
export type StompMessagePayload = z.infer<typeof StompMessagePayloadSchema>;

// STOMP 수신 메시지 body (서버에서 래퍼 구조로 전달)
export const StompReceivePayloadSchema = z.object({
  type: z.literal('MESSAGE'),
  read: z.null(),
  message: z.object({
    id: z.number().int().nonnegative(),
    roomId: z.number().int().nonnegative(),
    senderUuid: z.string(),
    message: z.string(),
    type: z.string(),
    isRead: z.boolean(),
    createdAt: z.string(),
  }),
});
export type StompReceivePayload = z.infer<typeof StompReceivePayloadSchema>;

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
