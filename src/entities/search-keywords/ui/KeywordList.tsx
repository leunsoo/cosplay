import type { SearchKeywordsDTO } from '../model';
import { KeywordItem } from './KeywordItem';

interface KeywordListProps {
  keywords: SearchKeywordsDTO['keywords'];
  onSearch: (keyword: string) => void;
  onDeleteSingle: (keywordId: number) => void;
  onDeleteAll: () => void;
}

export function KeywordList({
  keywords,
  onSearch,
  onDeleteSingle,
  onDeleteAll,
}: KeywordListProps) {
  if (keywords.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-2">
      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
        최근 검색:
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {keywords.map((item) => (
          <KeywordItem
            key={item.id}
            keyword={item.keyword}
            onSearch={onSearch}
            onDelete={() => onDeleteSingle(item.id)}
          />
        ))}
        <button
          onClick={onDeleteAll}
          className="text-xs text-gray-400 hover:text-gray-600 ml-2"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
}
