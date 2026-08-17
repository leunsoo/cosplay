'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z, type ZodType } from 'zod';
import type { ApiResponse } from '@/shared/api';
import { stompClient } from './stompClient';

const ActiveCountPayloadSchema = z.object({
  count: z.number().int().nonnegative(),
});

// 행사/모임 그룹 채팅 STOMP 발행 body는 두 도메인 모두 동일한 형태를 쓴다.
export interface GroupChatSendPayload {
  senderUuid: string;
  content: string;
  type: 'TEXT';
}

interface GroupChatTopics {
  room: string;
  active: string;
  send: string;
}

interface UseGroupChatConfig<
  TRoom extends { roomId: number },
  TMessageDTO,
  TMessage extends { id: number },
  TReceivePayload,
> {
  id: number;
  userUuid: string;
  disabled?: boolean;
  queryKeyPrefix: string;
  topics: GroupChatTopics;
  getRoom: () => Promise<ApiResponse<TRoom>>;
  getMessages: () => Promise<ApiResponse<TMessageDTO[]>>;
  getActiveCount: () => Promise<ApiResponse<{ count: number }>>;
  mapMessages: (dtos: TMessageDTO[], myUuid: string) => TMessage[];
  mapMessage: (payload: TReceivePayload, myUuid: string) => TMessage;
  receiveSchema: ZodType<TReceivePayload>;
}

// 행사/모임 실시간 그룹 채팅 공통 오케스트레이션.
// STOMP 연결/구독/발행 + room·messages·activeCount 쿼리 조합을 도메인 무관하게 처리하고,
// 도메인 API/스키마/매퍼는 호출부에서 그대로 소유한다.
export function useGroupChat<
  TRoom extends { roomId: number },
  TMessageDTO,
  TMessage extends { id: number },
  TReceivePayload,
>({
  id,
  userUuid,
  disabled = false,
  queryKeyPrefix,
  topics,
  getRoom,
  getMessages,
  getActiveCount,
  mapMessages,
  mapMessage,
  receiveSchema,
}: UseGroupChatConfig<TRoom, TMessageDTO, TMessage, TReceivePayload>) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [realtimeActiveCount, setRealtimeActiveCount] = useState<number | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);

  const roomQuery = useQuery({
    queryKey: [queryKeyPrefix, 'room', id],
    queryFn: getRoom,
  });

  const roomId = roomQuery.data?.data?.roomId;

  const messagesQuery = useQuery({
    queryKey: [queryKeyPrefix, 'messages', id],
    queryFn: getMessages,
    enabled: !!roomId,
    select: (data) => (data.data ? mapMessages(data.data, userUuid) : []),
  });

  const activeCountQuery = useQuery({
    queryKey: [queryKeyPrefix, 'activeCount', id],
    queryFn: getActiveCount,
    enabled: !!roomId,
  });

  useEffect(() => {
    const initialMessages = messagesQuery.data;
    if (!initialMessages || initialMessages.length === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return initialMessages;
    });
  }, [messagesQuery.data]);

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
      destination: `/topic/${topics.room}`,
      callback: (message) => {
        let parsed: unknown;
        try {
          parsed = JSON.parse(message.body);
        } catch {
          console.error('[Chat] JSON parse error, body:', message.body);
          return;
        }
        const result = receiveSchema.safeParse(parsed);
        if (!result.success) {
          console.error(
            '[Chat] Unexpected payload shape:',
            result.error.issues,
            parsed
          );
          return;
        }
        const mapped = mapMessage(result.data, userUuid);
        setMessages((prev) => {
          if (prev.some((m) => m.id === mapped.id)) return prev;
          return [...prev, mapped];
        });
      },
    });
    return () => unsubscribe();
  }, [disabled, topics.room, userUuid, mapMessage, receiveSchema]);

  // 접속 인원 구독
  useEffect(() => {
    if (disabled) return;
    const unsubscribe = stompClient.subscribe({
      destination: `/topic/${topics.active}`,
      callback: (message) => {
        const result = ActiveCountPayloadSchema.safeParse(
          JSON.parse(message.body)
        );
        if (!result.success) {
          console.error(
            '[Chat] Unexpected active count payload:',
            result.error.issues
          );
          return;
        }
        setRealtimeActiveCount(result.data.count);
      },
    });
    return () => unsubscribe();
  }, [disabled, topics.active]);

  useEffect(() => {
    if (isConnected) {
      activeCountQuery.refetch();
    }
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(
    (payload: GroupChatSendPayload): boolean => {
      try {
        stompClient.publish({
          destination: `/app/${topics.send}`,
          body: JSON.stringify(payload),
        });
        return true;
      } catch {
        return false;
      }
    },
    [topics.send]
  );

  const activeCount =
    realtimeActiveCount ?? activeCountQuery.data?.data?.count ?? 0;

  return {
    room: roomQuery.data?.data ?? null,
    messages,
    activeCount,
    sendMessage,
    isLoading: roomQuery.isPending,
    isError: roomQuery.isError,
  };
}
