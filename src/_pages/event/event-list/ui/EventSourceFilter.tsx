'use client';

import {
  type EventSourceTab,
  EVENT_SOURCE_TABS,
} from '../model/event-filter-options';

interface EventSourceFilterProps {
  selectedSource: EventSourceTab;
  onSourceChange: (source: EventSourceTab) => void;
}

export function EventSourceFilter({
  selectedSource,
  onSourceChange,
}: EventSourceFilterProps) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      {EVENT_SOURCE_TABS.map((source) => (
        <button
          key={source}
          onClick={() => onSourceChange(source)}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
            selectedSource === source
              ? 'bg-white text-slate-900 shadow-sm'
              : 'bg-transparent text-gray-500 hover:text-slate-900'
          }`}
        >
          {source} 행사
        </button>
      ))}
    </div>
  );
}
