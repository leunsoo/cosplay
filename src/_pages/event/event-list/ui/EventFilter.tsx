'use client';

import {
  type EventSourceTab,
  getCategoryOptions,
} from '../model/event-filter-options';

interface EventFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSource: EventSourceTab;
  showFavorites?: boolean;
  onToggleFavorites?: () => void;
}

export function EventFilter({
  selectedCategory,
  onCategoryChange,
  selectedSource,
  showFavorites,
  onToggleFavorites,
}: EventFilterProps) {
  const categories = getCategoryOptions(selectedSource);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (showFavorites) onToggleFavorites?.();
              onCategoryChange(cat);
            }}
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
      <button
        onClick={onToggleFavorites}
        className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors shrink-0 ${
          showFavorites
            ? 'bg-red-50 text-red-500'
            : 'bg-white border border-gray-200 text-gray-400'
        }`}
      >
        <span
          className="material-symbols-outlined text-[20px]"
          style={{
            fontVariationSettings: showFavorites ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          favorite
        </span>
      </button>
    </div>
  );
}
