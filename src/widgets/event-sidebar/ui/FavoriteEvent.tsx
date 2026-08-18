interface FavoriteEventProps {
  title: string;
  month: string;
  day: string;
  status?: string;
  isUpcoming?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export function FavoriteEvent({
  title,
  month,
  day,
  status,
  isUpcoming = false,
  onClick,
  onDelete,
}: FavoriteEventProps) {
  return (
    <div
      className="flex gap-3 items-start group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col items-center bg-gray-100 rounded-lg px-2 py-1 border border-gray-200 min-w-11">
        <span
          className={`text-[10px] font-bold ${isUpcoming ? 'text-primary' : 'text-gray-500'}`}
        >
          {month}
        </span>
        <span
          className={`text-base font-black leading-tight ${isUpcoming ? 'text-slate-800' : 'text-slate-600'}`}
        >
          {day}
        </span>
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-slate-900 font-bold text-sm truncate group-hover:text-primary transition-colors">
          {title}
        </p>
        {status && (
          <p className="text-gray-500 text-xs truncate mt-0.5">{status}</p>
        )}
      </div>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0 self-center"
        >
          <span className="material-symbols-outlined text-[16px] leading-none">
            close
          </span>
        </button>
      )}
    </div>
  );
}
