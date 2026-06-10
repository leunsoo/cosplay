interface LoadMoreButtonProps {
  remainingCount: number;
  onLoadMore: () => void;
}

export function LoadMoreButton({
  remainingCount,
  onLoadMore,
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={onLoadMore}
      className="w-full py-4 text-gray-500 hover:text-slate-900 hover:bg-white rounded-xl border border-dashed border-gray-300 transition-all flex items-center justify-center gap-2 text-sm font-bold mt-2 hover:border-primary/50 hover:shadow-sm"
    >
      <span>더 많은 행사 보기 ({remainingCount}개 남음)</span>
      <span className="material-symbols-outlined">expand_more</span>
    </button>
  );
}
