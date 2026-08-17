'use client';

import { useGroupChat } from '@/shared/stomp';
import { getEventChatRoom } from '../api/get-event-chat-room';
import { getEventChatMessages } from '../api/get-event-chat-messages';
import { getEventChatActiveCount } from '../api/get-event-chat-active-count';
import { EventChatReceivePayloadSchema } from '../api/event-chat-stomp';
import {
  mapEventChatMessageDTOToMessage,
  mapEventChatMessageDTOsToMessages,
} from '../api/mapper';

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
  return useGroupChat({
    id: eventId,
    userUuid,
    disabled,
    queryKeyPrefix: 'eventChat',
    topics: {
      room: `events.${eventId}.chat`,
      active: `events.${eventId}.chat.active`,
      send: `events.${eventId}.chat.send`,
    },
    getRoom: () => getEventChatRoom({ eventId }),
    getMessages: () => getEventChatMessages({ eventId }),
    getActiveCount: () => getEventChatActiveCount({ eventId }),
    mapMessages: mapEventChatMessageDTOsToMessages,
    mapMessage: mapEventChatMessageDTOToMessage,
    receiveSchema: EventChatReceivePayloadSchema,
  });
}
