'use client';

import { useLogined } from '@/entities/auth';
import { FavoriteIconButton } from '@/entities/favorite';
import { useMeetupFavoriteToggle } from '../model';

interface FavoriteMeetupButtonProps {
  meetupId: number;
  title: string;
  thumbnailUrl: string;
  scheduledAt: string;
  location: string;
}

export function FavoriteMeetupButton(props: FavoriteMeetupButtonProps) {
  const logined = useLogined();
  if (!logined) return null;
  return <FavoriteMeetupButtonInner {...props} />;
}

function FavoriteMeetupButtonInner({
  meetupId,
  title,
  thumbnailUrl,
  scheduledAt,
  location,
}: FavoriteMeetupButtonProps) {
  const { displayedFavorited, isPending, isLoading, handleClick } =
    useMeetupFavoriteToggle({
      meetupId,
      title,
      thumbnailUrl,
      scheduledAt,
      location,
    });

  return (
    <FavoriteIconButton
      favorited={displayedFavorited}
      isPending={isPending}
      isLoading={isLoading}
      onClick={handleClick}
    />
  );
}
