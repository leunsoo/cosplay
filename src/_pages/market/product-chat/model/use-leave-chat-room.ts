'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveChatRoom } from '../api/leave-chat-room';
import { CHAT_ROOM_LIST_QUERIES } from '../api/chat-room-list.query';

interface UseLeaveChatRoomParams {
  userUuid: string;
  onLeft: () => void;
}

// 채팅방 나가기: mutation + 목록 무효화 + URL 정리
export function useLeaveChatRoom({ userUuid, onLeft }: UseLeaveChatRoomParams) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const leaveRoomMutation = useMutation({
    mutationFn: (roomId: number) => leaveChatRoom({ roomId }, { userUuid }),
    onSuccess: () => {
      onLeft();
      queryClient.invalidateQueries({
        queryKey: CHAT_ROOM_LIST_QUERIES.list(userUuid),
      });
      queryClient.invalidateQueries({ queryKey: ['resolveChatRoom'] });
      router.replace('/market/chat');
    },
    onError: (error) => {
      console.error('[leaveChatRoom] API 오류:', error);
    },
  });

  return {
    leaveRoom: (roomId: number) => leaveRoomMutation.mutate(roomId),
  };
}
