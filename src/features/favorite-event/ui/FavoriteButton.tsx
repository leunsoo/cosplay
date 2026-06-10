'use client';

import { useLogined } from '@/entities/auth';
import { FavoriteIconButton } from '@/entities/favorite';
import { useEventFavoriteToggle } from '../model';

interface EventFavoriteButtonProps {
  eventId: number;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnailUrl: string;
}

export function FavoriteButton(props: EventFavoriteButtonProps) {
  const logined = useLogined();
  if (!logined) return null;
  return <FavoriteButtonInner {...props} />;
}

function FavoriteButtonInner({
  eventId,
  title,
  startDate,
  endDate,
  location,
  thumbnailUrl,
}: EventFavoriteButtonProps) {
  const { displayedFavorited, isPending, isLoading, handleClick } =
    useEventFavoriteToggle({
      eventId,
      title,
      startDate,
      endDate,
      location,
      thumbnailUrl,
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
