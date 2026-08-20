'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getChatRoom,
  CHAT_ROOM_QUERIES,
} from '@/shared/api/endpoints/product-chat';

interface UseChatRoomDetailParams {
  roomId: number;
  userUuid: string;
  enabled?: boolean;
}

export function useChatRoomDetail({
  roomId,
  userUuid,
  enabled = true,
}: UseChatRoomDetailParams) {
  return useQuery({
    queryKey: CHAT_ROOM_QUERIES.detail(roomId, userUuid),
    queryFn: () => getChatRoom({ roomId, userUuid }),
    enabled: enabled && !!roomId && !!userUuid,
  });
}
