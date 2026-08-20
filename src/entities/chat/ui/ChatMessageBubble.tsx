import { UserAvatar } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import type { ChatMessage } from '../model/chat-message';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isMyMessage = message.isMyMessage;
  const timestamp = new Date(message.createdAt).toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isMyMessage && 'flex-row-reverse'
      )}
    >
      <UserAvatar
        className="mt-3"
        avatarUrl={message.senderProfileImageUri}
        size="xs"
      />
      <div className="space-y-1 max-w-full md:max-w-[50%]">
        <div
          className={cn(
            'flex items-baseline gap-2',
            isMyMessage && 'flex-row-reverse'
          )}
        >
          <span className="text-[10px] md:text-xs font-bold text-gray-900 dark:text-white">
            {isMyMessage
              ? `나 (${message.senderNickname})`
              : message.senderNickname}
          </span>
        </div>
        <div
          className={cn(
            'flex items-end gap-2',
            isMyMessage ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <div
            className={cn(
              'bg-gray-50 text-gray-800 rounded-xl border-gray-200 min-w-0 px-4 py-2 text-xs md:text-sm leading-relaxed border',
              isMyMessage ? 'rounded-tr-sm' : 'rounded-tl-sm'
            )}
            style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}
          >
            {message.content}
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-400 whitespace-nowrap mb-1 shrink-0">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
