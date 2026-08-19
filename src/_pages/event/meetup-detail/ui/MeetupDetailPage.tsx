'use client';

import { useState } from 'react';
import { useMeetupDetail } from '../api/use-meetup-detail';
import { useMeetupJoinToggle } from '../model/use-meetup-join-toggle';
import { EventStatus } from '@/entities/event';
import { useLogined } from '@/entities/auth';
import { MeetupHeader } from './MeetupHeader';
import { MeetupGroupChat } from './MeetupGroupChat';
import { MeetupTabs, type MeetupTabType } from './MeetupTabs';
import { MeetupAbout } from './MeetupAbout';
import { MeetupMobileMenu } from './MeetupMobileMenu';
import { MobileHeaderCustom } from '@/widgets/mobile-header/MobileHeader';

interface MeetupDetailPageProps {
  meetupId: string;
}

export function MeetupDetailPage({ meetupId }: MeetupDetailPageProps) {
  const [activeTab, setActiveTab] = useState<MeetupTabType>('details');
  const meetupIdNum = Number(meetupId);

  const logined = useLogined();
  const { detail, isHost, isLoading, error, handleDelete, isDeleting } =
    useMeetupDetail(meetupIdNum);
  const { isJoined, handleJoin, handleLeave, isJoining, isLeaving } =
    useMeetupJoinToggle(meetupIdNum, !!detail);

  if (isLoading) {
    return (
      <main className="flex-1 container-custom pt-8 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">밋업 정보를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error || !detail) {
    return (
      <main className="flex-1 container-custom pt-8 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-400">
            error_outline
          </span>
          <p className="text-gray-600 font-medium">
            {error ?? '개인 행사 정보를 찾을 수 없습니다.'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <MobileHeaderCustom
        actions={
          isHost ? (
            <MeetupMobileMenu
              meetupId={meetupIdNum}
              isDeleting={isDeleting}
              onDelete={() => handleDelete()}
            />
          ) : undefined
        }
      />
      <main className="flex-1 container-custom pt-8 md:pb-20">
        <div className="space-y-4 md:space-y-8">
          <MeetupHeader
            meetupId={meetupIdNum}
            detail={detail}
            isHost={isHost}
            isDeleting={isDeleting}
            onDelete={() => handleDelete()}
          />

          <MeetupTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'details' && (
            <div className="px-2 md:px-0 space-y-6 md:space-y-12">
              <MeetupAbout description={detail.description} />
            </div>
          )}

          {activeTab === 'community' && (
            <div className="px-2 md:px-0 space-y-6 md:space-y-12">
              <MeetupGroupChat
                meetupId={meetupId}
                meetupStatus={
                  detail.status === 'CLOSED'
                    ? EventStatus.ENDED
                    : EventStatus.ONGOING
                }
                isJoined={isJoined}
              />
            </div>
          )}
        </div>

        {!isHost && (
          <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-4">
            <div className="container-custom">
              <button
                disabled={!logined || isJoining || isLeaving}
                onClick={() => (isJoined ? handleLeave() : handleJoin())}
                className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isJoined
                    ? 'bg-gray-100 text-gray-700 border border-gray-200'
                    : 'bg-primary text-white shadow-primary/20'
                }`}
              >
                {!logined
                  ? '로그인 후 참여할 수 있습니다.'
                  : isJoining || isLeaving
                    ? '처리 중...'
                    : isJoined
                      ? '참가 취소'
                      : '참가 신청'}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
