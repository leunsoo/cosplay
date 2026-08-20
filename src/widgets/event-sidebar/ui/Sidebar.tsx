'use client';

import { useState } from 'react';
import { useLogined } from '@/shared/auth';
import { useEventFavoriteList } from '@/features/favorite-event';
import { useMeetupFavoriteList } from '@/features/favorite-meetup';
import { FavoriteEventList } from './FavoriteEventList';
import { FavoriteMeetupList } from './FavoriteMeetupList';

type Tab = 'official' | 'personal';

export function Sidebar() {
  const logined = useLogined();
  const [activeTab, setActiveTab] = useState<Tab>('official');
  const { totalCount: officialCount } = useEventFavoriteList();
  const { totalCount: personalCount } = useMeetupFavoriteList();

  if (!logined) return null;

  const totalCount = activeTab === 'official' ? officialCount : personalCount;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-1.5 pl-2">
          <h2 className="text-gray-900 text-sm font-bold">관심행사</h2>
          <span className="text-xs font-bold text-primary">{totalCount}</span>
        </div>
        <div className="flex text-xs font-semibold border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('official')}
            className={`px-3 py-1 transition-colors ${
              activeTab === 'official'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            공식
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-3 py-1 transition-colors border-l border-gray-200 ${
              activeTab === 'personal'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            개인
          </button>
        </div>
      </div>

      {activeTab === 'official' ? (
        <FavoriteEventList />
      ) : (
        <FavoriteMeetupList />
      )}
    </div>
  );
}
