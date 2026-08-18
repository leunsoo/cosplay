'use client';

import { useRecentKeywords } from '../model/use-recent-keywords';
import { KeywordItem } from './KeywordItem';

interface KeywordListProps {
  onSearch: (keyword: string) => void;
}

export function KeywordList({ onSearch }: KeywordListProps) {
  const { keywords, deleteSingle, deleteAll } = useRecentKeywords();

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
            onDelete={() => deleteSingle(item.id)}
          />
        ))}
        <button
          onClick={() => deleteAll()}
          className="text-xs text-gray-400 hover:text-gray-600 ml-2"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
}
