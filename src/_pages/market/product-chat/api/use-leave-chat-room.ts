'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  leaveChatRoom,
  CHAT_ROOM_QUERIES,
} from '@/shared/api/endpoints/product-chat';
import { ROUTES } from '@/shared/routes';

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
        queryKey: CHAT_ROOM_QUERIES.list(userUuid),
      });
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_QUERIES.resolves() });
      router.replace(ROUTES.CHAT);
    },
    onError: (error) => {
      console.error('[leaveChatRoom] API 오류:', error);
    },
  });

  return {
    leaveRoom: (roomId: number) => leaveRoomMutation.mutate(roomId),
  };
}
