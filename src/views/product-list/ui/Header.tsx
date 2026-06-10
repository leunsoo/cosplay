interface HeaderProps {
  title: string;
  count: number;
  showFavorites?: boolean;
  onToggleFavorites?: () => void;
}

export function Header({
  title,
  count,
  showFavorites,
  onToggleFavorites,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 pb-2 border-b border-gray-200">
      <div className="flex items-center gap-2 min-w-0 overflow-hidden">
        <h2 className="text-gray-900 text-xl font-bold truncate min-w-0">
          {title}
        </h2>
        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
          {count.toLocaleString()}
        </span>
      </div>
      {onToggleFavorites && (
        <button
          onClick={onToggleFavorites}
          className={`md:hidden shrink-0 flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors ${
            showFavorites
              ? 'bg-red-50 border-red-200 text-red-500'
              : 'bg-white border-gray-200 text-gray-500'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {showFavorites ? 'favorite' : 'favorite_border'}
          </span>
          찜
        </button>
      )}
    </div>
  );
}
