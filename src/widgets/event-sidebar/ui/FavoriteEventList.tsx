'use client';

import {
  useEventFavoriteList,
  useDeleteFavoriteEvent,
} from '@/features/favorite-event';
import { FavoriteEvent } from './FavoriteEvent';
import { PageStepper } from '@/shared/ui';

export function FavoriteEventList() {
  const {
    isLoading,
    events,
    currentPage,
    totalPages,
    onPageChange,
    handleEventClick,
  } = useEventFavoriteList();
  const { mutate: handleDelete } = useDeleteFavoriteEvent();

  return (
    <div className="p-3">
      <div className="min-h-50 flex flex-col space-y-0.5">
        {!isLoading && events.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-400 text-sm">찜한 공식 행사가 없습니다.</p>
          </div>
        ) : (
          events.map((event) => (
            <FavoriteEvent
              key={event.id}
              title={event.title}
              month={event.month}
              day={event.day}
              status={event.status}
              isUpcoming={event.isUpcoming}
              onClick={() => handleEventClick(event.id)}
              onDelete={() => handleDelete(Number(event.id))}
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
