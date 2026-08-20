'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createChatRoom,
  CHAT_ROOM_QUERIES,
} from '@/shared/api/endpoints/product-chat';
import { ROUTES } from '@/shared/routes';

interface UseCreateChatRoomParams {
  userUuid: string;
  onCreated: (roomId: string) => void;
}

// 채팅방 생성: mutation + URL 교체(roomId 활성화용) + 목록 무효화
export function useCreateChatRoom({
  userUuid,
  onCreated,
}: UseCreateChatRoomParams) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: (response) => {
      const newRoomId = response.data.id;
      router.replace(`${ROUTES.CHAT}?roomId=${newRoomId}`);
      onCreated(String(newRoomId));
      queryClient.invalidateQueries({
        queryKey: CHAT_ROOM_QUERIES.list(userUuid),
      });
    },
  });
}
