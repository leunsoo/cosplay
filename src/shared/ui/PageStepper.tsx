interface PageStepperProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageStepper({
  currentPage,
  totalPages,
  onPageChange,
}: PageStepperProps) {
  if (totalPages === 0) totalPages = 1;
  return (
    <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-100">
      <button
        className="flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '18px' }}
        >
          chevron_left
        </span>
      </button>
      <span className="text-xs text-gray-600 font-medium">
        {currentPage}/{totalPages}
      </span>
      <button
        className="flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '18px' }}
        >
          chevron_right
        </span>
      </button>
    </div>
  );
}
