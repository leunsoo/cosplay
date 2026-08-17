'use client';

import { useMeetupFavoriteList } from '../model/use-meetup-favorite-list';
import { useDeleteFavoriteMeetup } from '../model/use-delete-favorite-meetup';
import { FavoriteMeetup } from './FavoriteMeetup';
import { PageStepper } from '@/shared/ui';

export function FavoriteMeetupList() {
  const {
    isLoading,
    meetups,
    currentPage,
    totalPages,
    onPageChange,
    handleMeetupClick,
  } = useMeetupFavoriteList();
  const { mutate: handleDelete } = useDeleteFavoriteMeetup();

  return (
    <div className="p-3">
      <div className="min-h-50 flex flex-col space-y-0.5">
        {!isLoading && meetups.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-400 text-sm">찜한 개인 행사가 없습니다.</p>
          </div>
        ) : (
          meetups.map((meetup) => (
            <FavoriteMeetup
              key={meetup.id}
              title={meetup.title}
              month={meetup.month}
              day={meetup.day}
              status={meetup.status}
              onClick={() => handleMeetupClick(meetup.id)}
              onDelete={() => handleDelete(Number(meetup.id))}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <PageStepper
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
