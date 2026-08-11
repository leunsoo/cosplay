'use client';

interface FavoritesToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export function FavoritesToggleButton({
  isActive,
  onToggle,
}: FavoritesToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors shrink-0 ${
        isActive
          ? 'bg-red-50 text-red-500'
          : 'bg-white border border-gray-200 text-gray-400'
      }`}
    >
      <span
        className="material-symbols-outlined text-[20px]"
        style={{
          fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
        }}
      >
        favorite
      </span>
    </button>
  );
}
