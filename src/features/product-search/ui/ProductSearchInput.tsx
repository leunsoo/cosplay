'use client';

import { KeywordList } from '@/entities/search-keywords';
import { useProductSearch, useRecentKeywords } from '../model';

export function ProductSearchInput() {
  const { keyword, setKeyword, handleSearch, handleKeyDown } =
    useProductSearch();
  const { keywords, deleteSingle, deleteAll } = useRecentKeywords();

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="상품을 찾아볼까요?"
          className="w-full h-14 pl-6 pr-14 text-base bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
        />
        <button
          onClick={() => handleSearch()}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center p-2 text-gray-400 hover:text-primary transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '24px' }}
          >
            search
          </span>
        </button>
      </div>

      {/* Recent Searches */}
      <KeywordList
        keywords={keywords}
        onSearch={handleSearch}
        onDeleteSingle={deleteSingle}
        onDeleteAll={deleteAll}
      />
    </div>
  );
}
