import { cn } from '@/shared/lib/cn';
import { ChatRoom } from '../model/chat';
import { UserAvatar } from '@/shared/ui';

interface ChatRoomItemProps extends ChatRoom {
  onClick?: () => void;
}

export function ChatRoomItem({
  userName,
  userAvatar,
  productTitle,
  lastMessage,
  lastMessageType,
  isActive,
  thumbnailImage,
  unreadCount,
  onClick,
}: ChatRoomItemProps) {
  const truncatedTitle =
    productTitle.length > 8 ? productTitle.slice(0, 8) + '..' : productTitle;
  const truncatedName =
    userName.length > 6 ? userName.slice(0, 6) + '..' : userName;

  return (
    <div
      className={cn(
        'group flex gap-4 p-4 cursor-pointer border-b border-gray-100',
        isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
      )}
      onClick={onClick}
    >
      {/* 겹친 이미지: 상품 썸네일(뒤) + 프로필(앞) */}
      <div className="relative shrink-0 w-14 h-12">
        {/* 프로필 - 왼쪽 상단 */}
        <UserAvatar
          avatarUrl={userAvatar ?? null}
          name={userName}
          size="sm"
          className="absolute left-0 top-0 border-2 border-white"
        />
        {/* 상품 썸네일 - 오른쪽 하단 */}
        <div
          className={cn(
            'absolute right-0 bottom-0 w-9 h-9 rounded-md',
            thumbnailImage
              ? 'bg-cover bg-center border border-gray-200'
              : 'bg-gray-100 flex items-center justify-center text-gray-300'
          )}
          style={
            thumbnailImage
              ? { backgroundImage: `url('${thumbnailImage}')` }
              : {}
          }
        >
          {!thumbnailImage && (
            <span className="material-symbols-outlined text-base">image</span>
          )}
        </div>
        {/* 읽지 않은 메시지 배지 */}
        {unreadCount !== undefined && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 bg-primary text-white text-[10px] font-bold rounded-full shadow-sm">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <span className="font-bold text-sm text-gray-900">
          {truncatedTitle}{' '}
          <span className="font-medium text-gray-500">({truncatedName})</span>
        </span>
        <p
          className={cn(
            'text-sm truncate pr-2',
            isActive ? 'text-gray-800 font-medium' : 'text-gray-500'
          )}
        >
          {lastMessageType === 'IMAGE' ? '사진' : lastMessage}
        </p>
      </div>
    </div>
  );
}
