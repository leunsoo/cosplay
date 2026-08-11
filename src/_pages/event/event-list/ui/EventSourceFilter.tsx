'use client';

interface EventSourceFilterProps {
  selectedSource: '공식' | '개인';
  onSourceChange: (source: '공식' | '개인') => void;
}

const SOURCES: ('공식' | '개인')[] = ['공식', '개인'];

export function EventSourceFilter({
  selectedSource,
  onSourceChange,
}: EventSourceFilterProps) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      {SOURCES.map((source) => (
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
