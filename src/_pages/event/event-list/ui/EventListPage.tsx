'use client';

import { useEventBrowser } from '../model/use-event-browser';
import { HeroBanner } from './HeroBanner';
import { EventListHeader } from './EventListHeader';
import { EventSourceFilter } from './EventSourceFilter';
import { EventStatusFilter } from './EventStatusFilter';
import { FavoritesToggleButton } from './FavoritesToggleButton';
import { EventSummaryCard } from './EventSummaryCard';
import { MeetupSummaryCard } from './MeetupSummaryCard';
import { isPersonalEvent, isOfficialEvent } from '../model/event';
import { EventCalendarView } from './EventCalendarView';
import { useLogined } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { useEventFavoriteList } from '@/features/favorite-event';
import { useMeetupFavoriteList } from '@/features/favorite-meetup';
import { MobileFab } from '@/shared/ui';

export function EventListPage() {
  const isLogined = useLogined();
  const { allEventsAsCards } = useEventFavoriteList();
  const { allMeetupsAsCards } = useMeetupFavoriteList();

  const {
    isLoading,
    error,
    events,
    selectedSource,
    selectedStatus,
    isCalendarView,
    showFavorites,
    onSourceChange,
    onStatusChange,
    onViewModeChange,
    onToggleFavorites,
  } = useEventBrowser();

  return (
    <div className="container-custom flex flex-col lg:flex-row min-h-screen pt-6 pb-20 gap-8">
      {/* 모바일 FAB — 개인 탭 + 로그인 시에만 표시 */}
      {selectedSource === '개인' && isLogined && (
        <MobileFab href={ROUTES.EVENT.REGISTER} />
      )}
      <main className="flex-1 flex flex-col gap-6">
        <HeroBanner />

        <EventSourceFilter
          selectedSource={selectedSource}
          onSourceChange={onSourceChange}
        />

        <div className="hidden md:block">
          <EventListHeader
            isCalendarView={isCalendarView}
            onViewModeChange={onViewModeChange}
            selectedSource={selectedSource}
            isLogined={isLogined}
          />
        </div>

        {!isCalendarView && (
          <div className="flex items-center justify-between">
            <EventStatusFilter
              selectedStatus={selectedStatus}
              onStatusChange={onStatusChange}
              selectedSource={selectedSource}
              showFavorites={showFavorites}
            />
            <div className="md:hidden">
              <FavoritesToggleButton
                isActive={showFavorites}
                onToggle={onToggleFavorites}
              />
            </div>
          </div>
        )}

        <section className="flex flex-col gap-4">
          {showFavorites ? (
            <div className="md:hidden flex flex-col gap-4">
              {selectedSource === '공식' ? (
                allEventsAsCards.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-10">
                    찜한 공식 행사가 없습니다.
                  </p>
                ) : (
                  allEventsAsCards.map((event) => (
                    <EventSummaryCard key={event.id} event={event} />
                  ))
                )
              ) : allMeetupsAsCards.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-10">
                  찜한 개인 행사가 없습니다.
                </p>
              ) : (
                allMeetupsAsCards.map((event) => (
                  <MeetupSummaryCard key={event.id} event={event} />
                ))
              )}
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm">
                  행사 목록을 불러오는 중...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400">
                  error_outline
                </span>
                <p className="text-gray-600 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-primary hover:underline"
                >
                  다시 시도
                </button>
              </div>
            </div>
          ) : !isCalendarView ? (
            <>
              {events.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-gray-400 text-sm">
                    해당하는 행사가 없습니다.
                  </p>
                </div>
              ) : (
                events.map((event) =>
                  isPersonalEvent(event) ? (
                    <MeetupSummaryCard key={event.id} event={event} />
                  ) : isOfficialEvent(event) ? (
                    <EventSummaryCard key={event.id} event={event} />
                  ) : null
                )
              )}
            </>
          ) : (
            <div className="hidden md:block">
              <EventCalendarView events={events} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
