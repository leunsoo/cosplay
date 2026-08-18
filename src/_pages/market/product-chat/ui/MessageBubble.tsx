import { Message } from '../model/chat';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { formatChatTimestamp } from './format-chat-timestamp';

export function MessageBubble({ type, message, imageUrl, timestamp }: Message) {
  const isSender = type === 'sender';

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        isSender ? 'items-end' : 'items-start',
        isSender ? 'ml-auto' : undefined,
        'max-w-[80%] sm:max-w-[65%] md:max-w-[50%]'
      )}
    >
      <div
        className={cn(
          'flex items-end gap-2',
          isSender ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        {imageUrl ? (
          <div className="overflow-hidden rounded-sm border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity shrink-0">
            <Image
              className="object-cover"
              src={imageUrl}
              alt="Image message"
              width={250}
              height={250}
            />
          </div>
        ) : (
          <div
            className={cn(
              'bg-gray-50 text-gray-800  rounded-xl  border-gray-200 min-w-0 px-4 py-2 text-sm leading-relaxed border',
              isSender ? 'rounded-tr-sm' : 'rounded-tl-sm'
            )}
            style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}
          >
            {message}
          </div>
        )}
        <span className="text-[10px] text-gray-400 whitespace-nowrap mb-1 shrink-0">
          {formatChatTimestamp(timestamp)}
        </span>
      </div>
    </div>
  );
}
