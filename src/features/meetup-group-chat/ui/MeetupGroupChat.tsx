'use client';

import { useAuthStore } from '@/shared/auth';
import { useLogined } from '@/entities/auth';
import { EventStatus } from '@/entities/event';
import { useMeetupGroupChat } from '../model';
import { GroupChatHeader, GroupMessageInput } from '@/entities/chat';
import { MeetupGroupMessageList } from './MeetupGroupMessageList';
import { useMeetupMembers } from '@/views/meetup-detail/model/hooks/useMeetupMembers';
import { IS_DEMO } from '@/shared/lib/isDemo';

interface MeetupGroupChatProps {
  meetupId: string;
  meetupStatus: EventStatus;
}

export function MeetupGroupChat({
  meetupId,
  meetupStatus,
}: MeetupGroupChatProps) {
  const userUuid = useAuthStore((state) => state.userUuid);
  const logined = useLogined();
  const { isJoined } = useMeetupMembers(Number(meetupId), logined);

  const isEnded = meetupStatus === EventStatus.ENDED;
  const canSend = logined && !isEnded && isJoined && !IS_DEMO;

  const { messages, activeCount, sendMessage, isLoading, isError } =
    useMeetupGroupChat({
      meetupId: Number(meetupId),
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
      : !isJoined
        ? '참여자만 채팅을 이용할 수 있습니다.'
        : IS_DEMO
          ? '데모 모드에서는 실시간 채팅이 지원되지 않습니다.'
          : null;

  return (
    <section>
      <GroupChatHeader activeCount={activeCount} />
      <div
        className="bg-white dark:bg-[#1b0d1b] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden flex flex-col h-130 md:h-150"
        data-clarity-mask="True"
      >
        <MeetupGroupMessageList messages={messages} />
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
