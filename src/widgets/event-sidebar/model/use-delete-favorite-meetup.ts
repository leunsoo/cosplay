'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import {
  FAVORITE_MEETUP_QUERIES,
  deleteFavoriteMeetup,
} from '@/shared/api/endpoints/favorite-meetup';

export function useDeleteFavoriteMeetup() {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  return useMutation({
    mutationFn: (meetupId: number) =>
      deleteFavoriteMeetup({ uuid: userUuid, meetupId }),
    onMutate: (meetupId: number) => {
      queryClient.setQueryData(
        FAVORITE_MEETUP_QUERIES.status(userUuid, meetupId),
        (old: { data: { isFavorited: boolean } } | undefined) =>
          old ? { ...old, data: { isFavorited: false } } : old
      );
    },
    onError: (_error, meetupId) => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_MEETUP_QUERIES.status(userUuid, meetupId),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: FAVORITE_MEETUP_QUERIES.list(userUuid).queryKey,
      });
    },
  });
}
