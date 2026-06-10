'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getMeetupChatRoom,
  getMeetupChatMessages,
  getMeetupChatActiveCount,
} from '../../api';
import {
  mapMeetupChatMessageDTOsToMessages,
  mapMeetupChatMessageDTOToMessage,
} from '../mapper';
import { useMeetupGroupChatStomp } from './useMeetupGroupChatStomp';
import type { MeetupChatMessage } from '../types';
import type {
  MeetupChatReceivePayload,
  MeetupChatActiveCountPayload,
} from '../schema';

interface UseMeetupGroupChatParams {
  meetupId: number;
  userUuid: string;
  disabled?: boolean;
}

export function useMeetupGroupChat({
  meetupId,
  userUuid,
  disabled = false,
}: UseMeetupGroupChatParams) {
  const [messages, setMessages] = useState<MeetupChatMessage[]>([]);
  const [realtimeActiveCount, setRealtimeActiveCount] = useState<number | null>(
    null
  );

  const roomQuery = useQuery({
    queryKey: ['meetupChatRoom', meetupId],
    queryFn: () => getMeetupChatRoom({ meetupId }),
  });

  const roomId = roomQuery.data?.data?.roomId;

  const messagesQuery = useQuery({
    queryKey: ['meetupChatMessages', meetupId],
    queryFn: () => getMeetupChatMessages({ meetupId }),
    enabled: !!roomId,
    select: (data) =>
      data.data ? mapMeetupChatMessageDTOsToMessages(data.data, userUuid) : [],
  });

  const activeCountQuery = useQuery({
    queryKey: ['meetupChatActiveCount', meetupId],
    queryFn: () => getMeetupChatActiveCount({ meetupId }),
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
    (payload: MeetupChatReceivePayload) => {
      const message = mapMeetupChatMessageDTOToMessage(payload, userUuid);
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    },
    [userUuid]
  );

  const handleActiveCountUpdate = useCallback(
    (payload: MeetupChatActiveCountPayload) => {
      setRealtimeActiveCount(payload.count);
    },
    []
  );

  const { sendMessage, isConnected } = useMeetupGroupChatStomp({
    meetupId,
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
