'use client';

import { useState } from 'react';
import { useEventList } from './use-event-list';
import type { EventSourceTab } from './event-filter-options';

export function useEventBrowser() {
  const {
    isLoading,
    error,
    events,
    selectedSource,
    setSelectedSource,
    selectedStatus,
    setSelectedStatus,
  } = useEventList();

  const [isCalendarView, setIsCalendarView] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const exitFavorites = () => setShowFavorites(false);

  const handleSourceChange = (source: EventSourceTab) => {
    setSelectedSource(source);
    setSelectedStatus('전체');
    setIsCalendarView(false);
    exitFavorites();
  };

  const handleStatusChange = (status: string) => {
    exitFavorites();
    setSelectedStatus(status);
  };

  return {
    isLoading,
    error,
    events,
    selectedSource,
    selectedStatus,
    isCalendarView,
    showFavorites,
    onSourceChange: handleSourceChange,
    onStatusChange: handleStatusChange,
    onViewModeChange: setIsCalendarView,
    onToggleFavorites: () => setShowFavorites((prev) => !prev),
    onExitFavorites: exitFavorites,
  };
}
