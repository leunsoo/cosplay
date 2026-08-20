'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatRoomList } from './ChatRoomList';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { MessageBubble } from './MessageBubble';
import { DateDivider } from './DateDivider';
import { SystemNotification } from './SystemNotification';
import { ConfirmDialog } from '@/shared/ui';
import { ROUTES } from '@/shared/routes';
import { useProductChat } from '../model/use-product-chat';

interface ChatPageProps {
  productId?: string;
  sellerUuid?: string;
  roomId?: string;
}

function formatDateLabel(isoString: string): string {
  return new Date(isoString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

function isSameDay(a: string, b: string): boolean {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

export function ChatPage({ productId, sellerUuid, roomId }: ChatPageProps) {
  const router = useRouter();
  // UI 전용 상태: 모바일에서 목록/채팅 뷰 전환
  const [mobileView, setMobileView] = useState<'list' | 'chat'>(
    productId || roomId ? 'chat' : 'list'
  );
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const leaveDialogRef = useRef<HTMLDialogElement>(null);

  // 비즈니스 로직은 useProductChat 훅에 위임
  const {
    chatRoomsWithActive,
    messages,
    selectedRoomId,
    headerProductInfo,
    isPending,
    canSend,
    isLoading,
    error,
    isCreatingRoom,
    handleMessageSend,
    handleSendImage,
    handleLeave,
  } = useProductChat({ productId, sellerUuid, roomId });

  const handleLeaveConfirm = () => {
    leaveDialogRef.current?.close();
    handleLeave();
  };

  const handleLeaveBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === leaveDialogRef.current) leaveDialogRef.current?.close();
  };

  // 새 메시지 도착 시 자동 스크롤
  useEffect(() => {
    if (messages.length === 0) return;
    requestAnimationFrame(() => {
      const el = messagesContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [messages]);

  // 방 클릭: URL을 roomId 기준으로 교체
  const handleRoomClick = (clickedRoomId: string) => {
    router.replace(`${ROUTES.CHAT}?roomId=${clickedRoomId}`);
    setMobileView('chat');
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main
      className="
      md:static md:flex md:gap-6 md:h-[calc(100vh-200px)] md:overflow-hidden md:pb-4
      fixed inset-x-0 top-14 bottom-18
      md:top-auto md:bottom-auto md:inset-auto
      flex gap-0 overflow-hidden bg-background-light
    "
    >
      {/* 채팅 목록 사이드바 */}
      <div
        className={`${
          mobileView === 'list' ? 'flex' : 'hidden lg:flex'
        } w-full lg:w-95 shrink-0`}
      >
        <ChatRoomList
          chatRooms={chatRoomsWithActive}
          onRoomClick={handleRoomClick}
        />
      </div>

      {/* 채팅 영역 */}
      <section
        className={`${
          mobileView === 'chat' ? 'flex' : 'hidden lg:flex'
        } flex-1 bg-white lg:rounded-xl lg:border lg:border-border-color lg:shadow-sm flex-col overflow-hidden relative`}
      >
        {/* 모바일 뒤로가기 버튼 */}
        <button
          className="lg:hidden p-3 flex items-center gap-1 text-sm text-gray-600 border-b border-gray-100 shrink-0"
          onClick={() => setMobileView('list')}
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          채팅 목록
        </button>

        {/* 방 선택됐거나 pending 상태일 때만 헤더 표시 */}
        {(selectedRoomId || isPending) && (
          <ChatHeader
            {...headerProductInfo}
            onLeave={
              selectedRoomId
                ? () => leaveDialogRef.current?.showModal()
                : undefined
            }
          />
        )}

        <ConfirmDialog
          dialogRef={leaveDialogRef}
          content={{
            title: '채팅방 나가기',
            description: '채팅방을 나가면 채팅 내역이 삭제됩니다.',
            confirmLabel: '나가기',
            cancelLabel: '취소',
          }}
          onConfirm={handleLeaveConfirm}
          onCancel={() => leaveDialogRef.current?.close()}
          onBackdropClick={handleLeaveBackdropClick}
        />

        {/* 방 미선택 안내 */}
        {!selectedRoomId && !isPending ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
            <span className="material-symbols-outlined text-5xl">
              chat_bubble
            </span>
            <p className="text-sm">채팅방을 선택해주세요</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* 메시지 목록 */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto min-h-0 p-3 sm:p-6 bg-[#FDFDFD] flex flex-col gap-4 sm:gap-5 chat-scroll"
            >
              <SystemNotification
                message="거래를 시작합니다."
                subMessage={`거래에 관한 의무 및 책임은 거래 당사자에게 있습니다.
              거래 안전을 위해 대화 내용이 모니터링 및 열람될 수 있습니다.`}
              />

              {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const showDivider =
                  msg.timestamp &&
                  (!prevMsg?.timestamp ||
                    !isSameDay(msg.timestamp, prevMsg.timestamp));
                return (
                  <React.Fragment key={msg.id}>
                    {showDivider && (
                      <DateDivider date={formatDateLabel(msg.timestamp)} />
                    )}
                    <MessageBubble {...msg} />
                  </React.Fragment>
                );
              })}
            </div>

            <MessageInput
              onSend={canSend ? handleMessageSend : undefined}
              onSendImage={canSend ? handleSendImage : undefined}
              disabled={isCreatingRoom}
            />
          </div>
        )}
      </section>
    </main>
  );
}
