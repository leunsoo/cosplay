'use client';

import {
  type EventSourceTab,
  getStatusOptions,
} from '../model/event-filter-options';

interface EventStatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedSource: EventSourceTab;
  showFavorites: boolean;
}

export function EventStatusFilter({
  selectedStatus,
  onStatusChange,
  selectedSource,
  showFavorites,
}: EventStatusFilterProps) {
  const statuses = getStatusOptions(selectedSource);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md transition-colors ${
            !showFavorites && selectedStatus === status
              ? 'bg-slate-800 text-white hover:bg-slate-700'
              : 'bg-white text-gray-600 font-medium border border-gray-200 hover:border-gray-400 hover:text-slate-900 shadow-sm'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
