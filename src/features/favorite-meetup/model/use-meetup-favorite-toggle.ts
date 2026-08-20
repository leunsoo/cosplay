'use client';

import { useAuthStore } from '@/shared/auth';
import { useOptimisticToggle } from '@/shared/lib/use-optimistic-toggle';
import type { ApiResponse } from '@/shared/api';
import { serializeEventStatus } from '@/entities/event';
import {
  FAVORITE_MEETUP_QUERIES,
  type FavoriteMeetupListDTO,
  getFavoriteMeetupStatus,
  addFavoriteMeetup,
  deleteFavoriteMeetup,
} from '@/shared/api/endpoints/favorite-meetup';
import type { FavoriteMeetup } from './favorite-meetup';

export function useMeetupFavoriteToggle({
  id,
  title,
  imageUrl,
  location,
  dateInfo,
  currentMembers,
  maxMembers,
  status,
}: FavoriteMeetup) {
  const userUuid = useAuthStore((state) => state.userUuid);
  const meetupId = Number(id);

  const { displayedActive, isPending, isLoading, handleClick } =
    useOptimisticToggle<ApiResponse<FavoriteMeetupListDTO>>({
      enabled: !!userUuid && !!meetupId,
      statusQueryKey: FAVORITE_MEETUP_QUERIES.status(userUuid, meetupId),
      listQueryKey: FAVORITE_MEETUP_QUERIES.list(userUuid).queryKey,
      fetchIsActive: () =>
        getFavoriteMeetupStatus({ uuid: userUuid, meetupId }),
      activate: () => addFavoriteMeetup({ uuid: userUuid }, { meetupId }),
      deactivate: () => deleteFavoriteMeetup({ uuid: userUuid, meetupId }),
      patchListCache: (old, activating) => {
        if (!old) return old;

        if (activating) {
          const alreadyExists = old.data.meetups.some(
            (m) => m.meetupId === meetupId
          );
          if (alreadyExists) return old;

          return {
            ...old,
            data: {
              ...old.data,
              totalCount: old.data.totalCount + 1,
              meetups: [
                {
                  meetupId,
                  title,
                  thumbnailUrl: imageUrl,
                  scheduledAt: dateInfo.startDate.toISOString(),
                  location,
                  maxMembers,
                  currentMembers,
                  status: serializeEventStatus(status),
                  favoritedAt: new Date().toISOString(),
                },
                ...old.data.meetups,
              ],
            },
          };
        }

        return {
          ...old,
          data: {
            ...old.data,
            totalCount: old.data.totalCount - 1,
            meetups: old.data.meetups.filter((m) => m.meetupId !== meetupId),
          },
        };
      },
    });

  return {
    displayedFavorited: displayedActive,
    isPending,
    isLoading,
    handleClick,
  };
}
