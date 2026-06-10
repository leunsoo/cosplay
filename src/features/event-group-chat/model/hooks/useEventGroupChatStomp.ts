'use client';

import { useEffect, useCallback, useState } from 'react';
import { stompClient } from '@/shared/stomp';
import {
  EventChatReceivePayloadSchema,
  EventChatActiveCountPayloadSchema,
  type EventChatSendPayload,
  type EventChatReceivePayload,
  type EventChatActiveCountPayload,
} from '../schema';

interface UseEventGroupChatStompParams {
  eventId: number;
  onMessage: (payload: EventChatReceivePayload) => void;
  onActiveCountUpdate: (payload: EventChatActiveCountPayload) => void;
  disabled?: boolean;
}

export function useEventGroupChatStomp({
  eventId,
  onMessage,
  onActiveCountUpdate,
  disabled = false,
}: UseEventGroupChatStompParams) {
  const [isConnected, setIsConnected] = useState(false);

  // STOMP 연결 수명주기
  useEffect(() => {
    if (disabled) return;
    stompClient.updateCallbacks({
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
    });
    stompClient.connect();
    return () => {
      stompClient.disconnect();
      setIsConnected(false);
    };
  }, [disabled]);

  // 메시지 구독
  useEffect(() => {
    if (disabled) return;
    const unsubscribe = stompClient.subscribe({
      destination: `/topic/events.${eventId}.chat`,
      callback: (message) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(message.body);
        } catch {
          console.error('[Chat] JSON parse error, body:', message.body);
          return;
        }
        const result = EventChatReceivePayloadSchema.safeParse(parsed);
        if (!result.success) {
          console.error(
            '[Chat] Unexpected payload shape:',
            result.error.issues,
            parsed
          );
          return;
        }
        onMessage(result.data);
      },
    });
    return () => unsubscribe();
  }, [disabled, eventId, onMessage]);

  // 접속 인원 구독
  useEffect(() => {
    if (disabled) return;
    const unsubscribe = stompClient.subscribe({
      destination: `/topic/events.${eventId}.chat.active`,
      callback: (message) => {
        const result = EventChatActiveCountPayloadSchema.safeParse(
          JSON.parse(message.body)
        );
        if (!result.success) {
          console.error(
            '[Chat] Unexpected active count payload:',
            result.error.issues
          );
          return;
        }
        onActiveCountUpdate(result.data);
      },
    });
    return () => unsubscribe();
  }, [disabled, eventId, onActiveCountUpdate]);

  const sendMessage = useCallback(
    (payload: EventChatSendPayload): boolean => {
      try {
        stompClient.publish({
          destination: `/app/events.${eventId}.chat.send`,
          body: JSON.stringify(payload),
        });
        return true;
      } catch {
        return false;
      }
    },
    [eventId]
  );

  return { sendMessage, isConnected };
}
