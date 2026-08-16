import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { FAVORITE_EVENT_QUERIES } from '@/shared/api/favorite-event';
import {
  mapFavoriteEventToBookmarkedEvent,
  mapFavoriteEventToOfficialEvent,
} from '../api/mapper';

const PAGE_SIZE = 3;

export function useEventFavoriteList() {
  const router = useRouter();
  const userUuid = useAuthStore((state) => state.userUuid);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    ...FAVORITE_EVENT_QUERIES.list(userUuid),
    staleTime: Infinity,
  });

  const favorites = data?.data;
  const rawEvents = favorites?.events ?? [];
  const allEvents = rawEvents.map(mapFavoriteEventToBookmarkedEvent);
  const allEventsAsCards = rawEvents.map(mapFavoriteEventToOfficialEvent);

  const totalPages = Math.ceil(allEvents.length / PAGE_SIZE);
  const pagedEvents = allEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleEventClick = (eventId: string) => {
    router.push(ROUTES.EVENT.DETAIL(eventId));
  };

  return {
    isLoading,
    totalCount: favorites?.totalCount ?? 0,
    events: pagedEvents,
    allEvents,
    allEventsAsCards,
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    handleEventClick,
  };
}
