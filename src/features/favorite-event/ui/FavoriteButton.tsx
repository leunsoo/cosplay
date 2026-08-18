'use client';

import { FavoriteIconButton } from '@/entities/favorite';
import { useEventFavoriteToggle } from '../model/use-event-favorite-toggle';
import type { FavoriteEvent } from '../model/favorite-event';

interface FavoriteButtonProps {
  event: FavoriteEvent;
}

export function FavoriteButton({ event }: FavoriteButtonProps) {
  const { displayedFavorited, isPending, isLoading, handleClick } =
    useEventFavoriteToggle(event);

  return (
    <FavoriteIconButton
      favorited={displayedFavorited}
      isPending={isPending}
      isLoading={isLoading}
      onClick={handleClick}
    />
  );
}
