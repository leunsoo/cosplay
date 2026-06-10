interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControl({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-12 mb-10">
      <div className="flex items-center gap-2">
        <button
          className="size-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors bg-white"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={
              page === currentPage
                ? 'size-9 flex items-center justify-center rounded-md bg-black text-white font-bold shadow-sm'
                : 'size-9 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-black transition-colors'
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="size-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors bg-white"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
