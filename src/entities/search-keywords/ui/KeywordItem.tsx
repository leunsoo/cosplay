interface KeywordItemProps {
  keyword: string;
  onSearch: (keyword: string) => void;
  onDelete: () => void;
}

export function KeywordItem({ keyword, onSearch, onDelete }: KeywordItemProps) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
      <button
        onClick={() => onSearch(keyword)}
        className="text-xs text-gray-700"
      >
        {keyword}
      </button>
      <button
        onClick={onDelete}
        className="flex items-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '14px' }}
        >
          close
        </span>
      </button>
    </div>
  );
}
