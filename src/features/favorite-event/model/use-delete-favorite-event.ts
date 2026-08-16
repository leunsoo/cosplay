'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import { FAVORITE_EVENT_QUERIES } from '@/shared/api/favorite-event';
import { deleteFavoriteEvent } from '../api/delete-favorite-event';

export function useDeleteFavoriteEvent() {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  return useMutation({
    mutationFn: (eventId: number) =>
      deleteFavoriteEvent({ uuid: userUuid, eventId }),
    onMutate: (eventId: number) => {
      queryClient.setQueryData(
        ['favorite-event-status', userUuid, eventId],
        (old: { data: { isFavorited: boolean } } | undefined) =>
          old ? { ...old, data: { isFavorited: false } } : old
      );
    },
    onError: (_error, eventId) => {
      queryClient.invalidateQueries({
        queryKey: ['favorite-event-status', userUuid, eventId],
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_EVENT_QUERIES.list(userUuid).queryKey,
      });
    },
  });
}
