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
    selectedCategory,
    setSelectedCategory,
  } = useEventList();

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
    isLoading,
    error,
    events,
    selectedSource,
    selectedCategory,
    isCalendarView,
    showFavorites,
    onSourceChange: handleSourceChange,
    onCategoryChange: handleCategoryChange,
    onViewModeChange: setIsCalendarView,
    onToggleFavorites: () => setShowFavorites((prev) => !prev),
    onExitFavorites: exitFavorites,
  };
}
