'use client';

import { useAuthStore } from '@/shared/auth';
import { useOptimisticToggle } from '@/shared/lib/use-optimistic-toggle';
import type { ApiResponse } from '@/shared/api';
import { serializeEventStatus } from '@/entities/event';
import {
  FAVORITE_EVENT_QUERIES,
  type FavoriteEventListDTO,
  getFavoriteEventStatus,
  addFavoriteEvent,
  deleteFavoriteEvent,
} from '@/shared/api/endpoints/favorite-event';
import type { FavoriteEvent } from './favorite-event';

export function useEventFavoriteToggle({
  id,
  title,
  imageUrl,
  location,
  price,
  category,
  status,
  dateInfo,
}: FavoriteEvent) {
  const userUuid = useAuthStore((state) => state.userUuid);
  const eventId = Number(id);

  const { displayedActive, isPending, isLoading, handleClick } =
    useOptimisticToggle<ApiResponse<FavoriteEventListDTO>>({
      enabled: !!userUuid && !!eventId,
      statusQueryKey: FAVORITE_EVENT_QUERIES.status(userUuid, eventId),
      listQueryKey: FAVORITE_EVENT_QUERIES.list(userUuid).queryKey,
      fetchIsActive: () => getFavoriteEventStatus({ uuid: userUuid, eventId }),
      activate: () => addFavoriteEvent({ uuid: userUuid }, { eventId }),
      deactivate: () => deleteFavoriteEvent({ uuid: userUuid, eventId }),
      patchListCache: (old, activating) => {
        if (!old) return old;

        if (activating) {
          const alreadyExists = old.data.events.some(
            (e) => e.eventId === eventId
          );
          if (alreadyExists) return old;

          return {
            ...old,
            data: {
              ...old.data,
              totalCount: old.data.totalCount + 1,
              events: [
                {
                  eventId,
                  title,
                  thumbnailUrl: imageUrl,
                  startDate: dateInfo.startDate,
                  endDate: dateInfo.endDate ?? dateInfo.startDate,
                  location,
                  price,
                  category,
                  status: serializeEventStatus(status),
                  favoritedAt: new Date().toISOString(),
                },
                ...old.data.events,
              ],
            },
          };
        }

        return {
          ...old,
          data: {
            ...old.data,
            totalCount: old.data.totalCount - 1,
            events: old.data.events.filter((e) => e.eventId !== eventId),
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
