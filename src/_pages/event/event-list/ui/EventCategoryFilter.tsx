'use client';

import {
  type EventSourceTab,
  getCategoryOptions,
} from '../model/event-filter-options';

interface EventCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSource: EventSourceTab;
  showFavorites: boolean;
}

export function EventCategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedSource,
  showFavorites,
}: EventCategoryFilterProps) {
  const categories = getCategoryOptions(selectedSource);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md transition-colors ${
            !showFavorites && selectedCategory === cat
              ? 'bg-slate-800 text-white hover:bg-slate-700'
              : 'bg-white text-gray-600 font-medium border border-gray-200 hover:border-gray-400 hover:text-slate-900 shadow-sm'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
