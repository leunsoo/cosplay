'use client';

import { useGroupChat } from '@/shared/stomp';
import {
  getMeetupChatRoom,
  getMeetupChatMessages,
  getMeetupChatActiveCount,
  MeetupChatReceivePayloadSchema,
} from '@/shared/api/endpoints/meetup-chat';
import {
  mapMeetupChatMessageDTOToMessage,
  mapMeetupChatMessageDTOsToMessages,
} from '../api/mapper';

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
  return useGroupChat({
    id: meetupId,
    userUuid,
    disabled,
    queryKeyPrefix: 'meetupChat',
    topics: {
      room: `meetups.${meetupId}.chat`,
      active: `meetups.${meetupId}.chat.active`,
      send: `meetups.${meetupId}.chat.send`,
    },
    getRoom: () => getMeetupChatRoom({ meetupId }),
    getMessages: () => getMeetupChatMessages({ meetupId }),
    getActiveCount: () => getMeetupChatActiveCount({ meetupId }),
    mapMessages: mapMeetupChatMessageDTOsToMessages,
    mapMessage: mapMeetupChatMessageDTOToMessage,
    receiveSchema: MeetupChatReceivePayloadSchema,
  });
}
