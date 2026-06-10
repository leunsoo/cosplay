'use client';

import { useEffect, useCallback, useState } from 'react';
import { stompClient } from '@/shared/stomp';
import {
  MeetupChatReceivePayloadSchema,
  MeetupChatActiveCountPayloadSchema,
  type MeetupChatSendPayload,
  type MeetupChatReceivePayload,
  type MeetupChatActiveCountPayload,
} from '../schema';

interface UseMeetupGroupChatStompParams {
  meetupId: number;
  onMessage: (payload: MeetupChatReceivePayload) => void;
  onActiveCountUpdate: (payload: MeetupChatActiveCountPayload) => void;
  disabled?: boolean;
}

export function useMeetupGroupChatStomp({
  meetupId,
  onMessage,
  onActiveCountUpdate,
  disabled = false,
}: UseMeetupGroupChatStompParams) {
  const [isConnected, setIsConnected] = useState(false);

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

  useEffect(() => {
    if (disabled) return;
    const unsubscribe = stompClient.subscribe({
      destination: `/topic/meetups.${meetupId}.chat`,
      callback: (message) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(message.body);
        } catch {
          console.error('[Chat] JSON parse error, body:', message.body);
          return;
        }
        const result = MeetupChatReceivePayloadSchema.safeParse(parsed);
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
  }, [disabled, meetupId, onMessage]);

  useEffect(() => {
    if (disabled) return;
    const unsubscribe = stompClient.subscribe({
      destination: `/topic/meetups.${meetupId}.chat.active`,
      callback: (message) => {
        const result = MeetupChatActiveCountPayloadSchema.safeParse(
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
  }, [disabled, meetupId, onActiveCountUpdate]);

  const sendMessage = useCallback(
    (payload: MeetupChatSendPayload): boolean => {
      try {
        stompClient.publish({
          destination: `/app/meetups.${meetupId}.chat.send`,
          body: JSON.stringify(payload),
        });
        return true;
      } catch {
        return false;
      }
    },
    [meetupId]
  );

  return { sendMessage, isConnected };
}
