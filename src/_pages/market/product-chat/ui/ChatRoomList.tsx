import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { ChatRoom } from '../model/chat';
import { ChatRoomItem } from './ChatRoomItem';

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  onRoomClick?: (roomId: string) => void;
}

type FilterType = 'all' | 'unread';

export function ChatRoomList({ chatRooms, onRoomClick }: ChatRoomListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredRooms =
    filter === 'unread'
      ? chatRooms.filter((room) => (room.unreadCount ?? 0) > 0)
      : chatRooms;

  return (
    <aside className="w-full lg:w-95 bg-white lg:rounded-xl lg:border lg:border-border-color lg:shadow-sm flex flex-col overflow-hidden shrink-0">
      <div className="p-4 px-5 border-b border-gray-100 flex justify-between items-center bg-white z-10">
        <h2 className="font-bold text-lg text-gray-900">채팅 목록</h2>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'text-xs font-medium px-2 py-1 rounded transition-colors',
              filter === 'unread'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:text-primary hover:bg-gray-50'
            )}
            onClick={() => setFilter('unread')}
          >
            안읽음
          </button>
          <button
            className={cn(
              'text-xs font-medium px-2 py-1 rounded transition-colors',
              filter === 'all'
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:text-primary hover:bg-gray-50'
            )}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 chat-scroll">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
            <p className="text-sm">채팅 내역이 없습니다</p>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <ChatRoomItem
              key={room.id}
              {...room}
              onClick={() => onRoomClick?.(room.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
