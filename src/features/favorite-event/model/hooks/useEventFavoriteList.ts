import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { deleteFavoriteEvent, getFavoriteEventList } from '../../api';
import {
  mapFavoriteEventToBookmarkedEvent,
  mapFavoriteEventToOfficialEvent,
} from '../mapper';

const PAGE_SIZE = 3;

export function useEventFavoriteList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['favorite-event', userUuid],
    queryFn: () => getFavoriteEventList({ uuid: userUuid }),
    enabled: !!userUuid,
    staleTime: Infinity,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: (eventId: number) =>
      deleteFavoriteEvent({ uuid: userUuid, eventId }),
    onMutate: (eventId: number) => {
      queryClient.setQueryData(
        ['favorite-event-status', userUuid, eventId],
        (old: { data: { isFavorited: boolean } } | undefined) =>
          old ? { ...old, data: { isFavorited: false } } : old
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite-event', userUuid] });
    },
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
    handleDelete,
  };
}
