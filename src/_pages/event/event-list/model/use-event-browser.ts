'use client';

import { useState } from 'react';
import { useLogined } from '@/entities/auth';
import { useEventFavoriteList } from '@/features/favorite-event';
import { useMeetupFavoriteList } from '@/features/favorite-meetup';
import { useEventList } from './use-event-list';
import type { EventSourceTab } from './event-filter-options';

export function useEventBrowser() {
  const isLogined = useLogined();
  const {
    isLoading,
    error,
    events,
    selectedSource,
    setSelectedSource,
    selectedCategory,
    setSelectedCategory,
  } = useEventList();

  const { allEventsAsCards } = useEventFavoriteList();
  const { allMeetupsAsCards } = useMeetupFavoriteList();

  const [isCalendarView, setIsCalendarView] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const exitFavorites = () => setShowFavorites(false);

  const handleSourceChange = (source: EventSourceTab) => {
    setSelectedSource(source);
    setSelectedCategory('전체');
    setIsCalendarView(false);
    exitFavorites();
  };

  const handleCategoryChange = (category: string) => {
    exitFavorites();
    setSelectedCategory(category);
  };

  return {
    isLogined,
    isLoading,
    error,
    events,
    selectedSource,
    selectedCategory,
    allEventsAsCards,
    allMeetupsAsCards,
    isCalendarView,
    showFavorites,
    onSourceChange: handleSourceChange,
    onCategoryChange: handleCategoryChange,
    onViewModeChange: setIsCalendarView,
    onToggleFavorites: () => setShowFavorites((prev) => !prev),
    onExitFavorites: exitFavorites,
  };
}
