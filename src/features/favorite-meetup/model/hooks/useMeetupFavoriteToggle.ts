import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { type ApiResponse } from '@/shared/api';
import { useAuthStore } from '@/shared/store/authStore';
import {
  getFavoriteMeetupStatus,
  addFavoriteMeetup,
  deleteFavoriteMeetup,
} from '../../api';
import type { FavoriteMeetupListDTO } from '../schema/getFavoriteMeetupList';

interface UseMeetupFavoriteToggleParams {
  meetupId: number;
  title: string;
  thumbnailUrl: string;
  scheduledAt: string;
  location: string;
}

export function useMeetupFavoriteToggle({
  meetupId,
  title,
  thumbnailUrl,
  scheduledAt,
  location,
}: UseMeetupFavoriteToggleParams) {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  const { data, isLoading } = useQuery({
    queryKey: ['favorite-meetup-status', userUuid, meetupId],
    queryFn: () => getFavoriteMeetupStatus({ uuid: userUuid, meetupId }),
    enabled: !!userUuid && !!meetupId,
    staleTime: 0,
    gcTime: 0,
  });

  const isFavorited = data?.data.isFavorited ?? false;

  const [optimisticFavorited, setOptimisticFavorited] = useState<
    boolean | null
  >(null);

  const displayedFavorited = optimisticFavorited ?? isFavorited;

  const addFavoriteMutation = useMutation({
    mutationFn: () => addFavoriteMeetup({ uuid: userUuid }, { meetupId }),
    onError: () => {
      setOptimisticFavorited(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite-meetup-status', userUuid, meetupId],
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite-meetup', userUuid],
      });
      setOptimisticFavorited(null);
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: () => deleteFavoriteMeetup({ uuid: userUuid, meetupId }),
    onError: () => {
      setOptimisticFavorited(null);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite-meetup-status', userUuid, meetupId],
      });
      queryClient.invalidateQueries({
        queryKey: ['favorite-meetup', userUuid],
      });
      setOptimisticFavorited(null);
    },
  });

  const debouncedMutate = useDebouncedCallback((shouldFavorite: boolean) => {
    if (shouldFavorite) {
      addFavoriteMutation.mutate();
    } else {
      deleteFavoriteMutation.mutate();
    }
  }, 300);

  const handleClick = () => {
    const nextFavorited = !displayedFavorited;

    setOptimisticFavorited(nextFavorited);

    queryClient.setQueryData(
      ['favorite-meetup', userUuid],
      (old: ApiResponse<FavoriteMeetupListDTO> | undefined) => {
        if (!old) return old;

        if (nextFavorited) {
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
                  thumbnailUrl,
                  scheduledAt,
                  location,
                  favoritedAt: new Date().toISOString(),
                },
                ...old.data.meetups,
              ],
            },
          };
        } else {
          return {
            ...old,
            data: {
              ...old.data,
              totalCount: old.data.totalCount - 1,
              meetups: old.data.meetups.filter((m) => m.meetupId !== meetupId),
            },
          };
        }
      }
    );

    debouncedMutate(nextFavorited);
  };

  const isPending =
    addFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  return { displayedFavorited, isPending, isLoading, handleClick };
}
