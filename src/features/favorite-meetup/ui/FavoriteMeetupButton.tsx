'use client';

import { FavoriteIconButton } from '@/entities/favorite';
import { useMeetupFavoriteToggle } from '../model/use-meetup-favorite-toggle';
import type { FavoriteMeetup } from '../model/favorite-meetup';

interface FavoriteMeetupButtonProps {
  meetup: FavoriteMeetup;
}

export function FavoriteMeetupButton({ meetup }: FavoriteMeetupButtonProps) {
  const { displayedFavorited, isPending, isLoading, handleClick } =
    useMeetupFavoriteToggle(meetup);

  return (
    <FavoriteIconButton
      favorited={displayedFavorited}
      isPending={isPending}
      isLoading={isLoading}
      onClick={handleClick}
    />
  );
}
