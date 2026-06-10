'use client';

import { useAuthStore } from '@/shared/store/authStore';
import { useLogined } from '@/entities/auth';
import { EventStatus } from '@/entities/event';
import { useEventGroupChat } from '../model';
import { GroupChatHeader, GroupMessageInput } from '@/entities/chat';
import { GroupMessageList } from './GroupMessageList';

interface EventGroupChatProps {
  eventId: string;
  eventStatus: EventStatus;
}

export function EventGroupChat({ eventId, eventStatus }: EventGroupChatProps) {
  const userUuid = useAuthStore((state) => state.userUuid);
  const logined = useLogined();

  const isEnded = eventStatus === EventStatus.ENDED;
  const canSend = logined && !isEnded;

  const { messages, activeCount, sendMessage, isLoading, isError } =
    useEventGroupChat({
      eventId: Number(eventId),
      userUuid,
      disabled: isEnded,
    });

  if (isLoading) {
    return (
      <section>
        <GroupChatHeader activeCount={0} />
        <div
          className="bg-white dark:bg-[#1b0d1b] border border-gray-200 dark:border-gray-800 rounded-2xl h-100 flex items-center justify-center"
          data-clarity-mask="True"
        >
          <p className="text-gray-400 text-sm">채팅을 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <GroupChatHeader activeCount={0} />
        <div
          className="bg-white dark:bg-[#1b0d1b] border border-gray-200 dark:border-gray-800 rounded-2xl h-100 flex items-center justify-center"
          data-clarity-mask="True"
        >
          <p className="text-gray-400 text-sm">채팅을 불러올 수 없습니다.</p>
        </div>
      </section>
    );
  }

  const handleSend = (content: string) => {
    if (!canSend || !userUuid) return;
    sendMessage({ senderUuid: userUuid, content, type: 'TEXT' });
  };

  const inputGuideMessage = isEnded
    ? '종료된 행사입니다.'
    : !logined
      ? '채팅에 참여하려면 로그인 후 이용해주세요.'
      : null;

  return (
    <section>
      <GroupChatHeader activeCount={activeCount} />
      <div
        className="bg-white dark:bg-[#1b0d1b] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col h-130 md:h-150"
        data-clarity-mask="True"
      >
        <GroupMessageList messages={messages} />
        {inputGuideMessage && (
          <p className="text-center text-xs text-gray-400 py-2">
            {inputGuideMessage}
          </p>
        )}
        <GroupMessageInput onSend={handleSend} disabled={!canSend} />
      </div>
    </section>
  );
}
