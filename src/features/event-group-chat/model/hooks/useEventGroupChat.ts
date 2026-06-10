'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getEventChatRoom,
  getEventChatMessages,
  getEventChatActiveCount,
} from '../../api';
import {
  mapEventChatMessageDTOsToMessages,
  mapEventChatMessageDTOToMessage,
} from '../mapper';
import { useEventGroupChatStomp } from './useEventGroupChatStomp';
import type { EventChatMessage } from '../types';
import type {
  EventChatReceivePayload,
  EventChatActiveCountPayload,
} from '../schema';

interface UseEventGroupChatParams {
  eventId: number;
  userUuid: string;
  disabled?: boolean;
}

export function useEventGroupChat({
  eventId,
  userUuid,
  disabled = false,
}: UseEventGroupChatParams) {
  const [messages, setMessages] = useState<EventChatMessage[]>([]);
  const [realtimeActiveCount, setRealtimeActiveCount] = useState<number | null>(
    null
  );

  const roomQuery = useQuery({
    queryKey: ['eventChatRoom', eventId],
    queryFn: () => getEventChatRoom({ eventId }),
  });

  const roomId = roomQuery.data?.data?.roomId;

  const messagesQuery = useQuery({
    queryKey: ['eventChatMessages', eventId],
    queryFn: () => getEventChatMessages({ eventId }),
    enabled: !!roomId,
    select: (data) =>
      data.data ? mapEventChatMessageDTOsToMessages(data.data, userUuid) : [],
  });

  const activeCountQuery = useQuery({
    queryKey: ['eventChatActiveCount', eventId],
    queryFn: () => getEventChatActiveCount({ eventId }),
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

  const handleMessage = useCallback(
    (payload: EventChatReceivePayload) => {
      const message = mapEventChatMessageDTOToMessage(payload, userUuid);
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    },
    [userUuid]
  );

  const handleActiveCountUpdate = useCallback(
    (payload: EventChatActiveCountPayload) => {
      setRealtimeActiveCount(payload.count);
    },
    []
  );

  const { sendMessage, isConnected } = useEventGroupChatStomp({
    eventId,
    onMessage: handleMessage,
    onActiveCountUpdate: handleActiveCountUpdate,
    disabled,
  });

  useEffect(() => {
    if (isConnected) {
      activeCountQuery.refetch();
    }
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

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
