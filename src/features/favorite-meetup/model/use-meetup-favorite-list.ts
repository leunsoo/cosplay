import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { FAVORITE_MEETUP_QUERIES } from '@/shared/api/endpoints/favorite-meetup';
import {
  mapFavoriteMeetupToBookmarkedMeetup,
  mapFavoriteMeetupToPersonalEvent,
} from './mapper';

const PAGE_SIZE = 3;

export function useMeetupFavoriteList() {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    ...FAVORITE_MEETUP_QUERIES.list(userUuid),
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

  const handleMeetupClick = (meetupId: string) => {
    router.push(ROUTES.MEETUP.DETAIL(meetupId));
  };

  return {
    isLoading,
    totalCount: favorites?.totalCount ?? 0,
    meetups: pagedMeetups,
    allMeetupsAsCards,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    handleMeetupClick,
  };
}
