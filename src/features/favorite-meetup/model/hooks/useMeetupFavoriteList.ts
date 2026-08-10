import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { deleteFavoriteMeetup, getFavoriteMeetupList } from '../../api';
import {
  mapFavoriteMeetupToBookmarkedMeetup,
  mapFavoriteMeetupToPersonalEvent,
} from '../mapper';

const PAGE_SIZE = 3;

export function useMeetupFavoriteList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['favorite-meetup', userUuid],
    queryFn: () => getFavoriteMeetupList({ uuid: userUuid }),
    enabled: !!userUuid,
    staleTime: Infinity,
  });

  const favorites = data?.data;
  const rawMeetups = favorites?.meetups ?? [];
  const allMeetups = rawMeetups.map(mapFavoriteMeetupToBookmarkedMeetup);
  const allMeetupsAsCards = rawMeetups.map(mapFavoriteMeetupToPersonalEvent);

  const totalPages = Math.ceil(allMeetups.length / PAGE_SIZE);
  const pagedMeetups = allMeetups.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const { mutate: handleDelete } = useMutation({
    mutationFn: (meetupId: number) =>
      deleteFavoriteMeetup({ uuid: userUuid, meetupId }),
    onMutate: (meetupId: number) => {
      queryClient.setQueryData(
        ['favorite-meetup-status', userUuid, meetupId],
        (old: { data: { isFavorited: boolean } } | undefined) =>
          old ? { ...old, data: { isFavorited: false } } : old
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite-meetup', userUuid],
      });
    },
  });

  const handleMeetupClick = (meetupId: string) => {
    router.push(ROUTES.MEETUP.DETAIL(meetupId));
  };

  return {
    isLoading,
    totalCount: favorites?.totalCount ?? 0,
    meetups: pagedMeetups,
    allMeetups,
    allMeetupsAsCards,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    handleMeetupClick,
    handleDelete,
  };
}
