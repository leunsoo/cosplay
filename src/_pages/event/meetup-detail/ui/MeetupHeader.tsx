'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ROUTES } from '@/shared/routes';
import type { MeetupDetailDTO } from '@/shared/api/endpoints/meetup';
import { parseEventStatus } from '@/entities/event';
import { useLogined } from '@/shared/auth';
import { useMeetupMembers } from '../api/use-meetup-members';
import { FavoriteMeetupButton } from '@/features/favorite-meetup';
import { ConfirmDialog } from '@/shared/ui';

export interface MeetupHeaderProps {
  meetupId: number;
  detail: MeetupDetailDTO;
  isHost: boolean;
  isDeleting: boolean;
  onDelete: () => void;
}

function formatScheduledAt(scheduledAt: string): string {
  const date = new Date(scheduledAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours < 12 ? '오전' : '오후';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${year}년 ${month}월 ${day}일 (${dayName}) · ${ampm} ${displayHours}:${minutes}`;
}

export function MeetupHeader({
  meetupId,
  detail,
  isHost,
  isDeleting,
  onDelete,
}: MeetupHeaderProps) {
  const { members } = useMeetupMembers(meetupId);
  const logined = useLogined();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const favoriteMeetupTarget = {
    id: String(detail.meetupId),
    title: detail.title,
    imageUrl: detail.thumbnailUrl ?? '',
    location: detail.location,
    dateInfo: { startDate: new Date(detail.scheduledAt), isRecurring: false },
    currentMembers: detail.currentMembers,
    maxMembers: detail.maxMembers,
    status: parseEventStatus(detail.status),
  };

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeDialog();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white md:border md:border-gray-200 md:rounded-xs md:shadow-sm md:p-12 overflow-hidden">
      {/* 이미지 */}
      <div className="md:w-2/5 md:shrink-0 md:pr-12">
        <div className="relative w-full aspect-square md:rounded-xs overflow-hidden md:shadow-md bg-gray-100">
          <Image
            src={detail.thumbnailUrl || '/placeholder.png'}
            alt={detail.title}
            fill
            className="object-cover"
          />
          {/* 모바일: 찜 버튼 이미지 우측 상단 오버레이 */}
          {logined && (
            <div className="absolute top-3 right-3 md:hidden">
              <FavoriteMeetupButton meetup={favoriteMeetupTarget} />
            </div>
          )}
        </div>
      </div>

      {/* 제목 + 메타정보 */}
      <div className="flex-1 min-w-0 flex flex-col gap-0 divide-y divide-gray-100 px-4 md:px-0">
        {/* 제목 + 찜 버튼 */}
        <div className="flex items-start justify-between gap-4 pb-3 md:pb-4">
          <h1
            className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight"
            style={{ wordBreak: 'break-all' }}
          >
            {detail.title}
          </h1>
          {/* 데스크탑: 찜 버튼 제목 옆 */}
          {logined && (
            <div className="hidden md:block shrink-0">
              <FavoriteMeetupButton meetup={favoriteMeetupTarget} />
            </div>
          )}
        </div>

        {/* 날짜 */}
        <div className="py-3 md:py-3 md:flex md:items-center md:gap-6">
          <p className="text-xs md:w-20 md:text-base font-bold text-gray-400 md:text-gray-900 uppercase tracking-wider mb-0.5 md:mb-0 shrink-0">
            날짜
          </p>
          <p className="font-bold text-gray-900 text-sm md:text-base">
            {formatScheduledAt(detail.scheduledAt)}
          </p>
        </div>

        {/* 장소 */}
        <div className="py-3 md:py-3 md:flex md:items-center md:gap-6">
          <p className="text-xs md:w-20 md:text-base font-bold text-gray-400 md:text-gray-900 uppercase tracking-wider mb-0.5 md:mb-0 shrink-0">
            장소
          </p>
          <p className="font-bold text-gray-900 text-sm md:text-base">
            {detail.location}
          </p>
        </div>

        {/* 상세 장소 */}
        {detail.locationDetail && (
          <div className="py-3 md:py-3 md:flex md:items-center md:gap-6">
            <p className="text-xs md:w-20 md:text-base font-bold text-gray-400 md:text-gray-900 uppercase tracking-wider mb-0.5 md:mb-0 shrink-0">
              상세 장소
            </p>
            <p className="font-bold text-gray-900 text-sm md:text-base">
              {detail.locationDetail}
            </p>
          </div>
        )}

        {/* 모집 인원 */}
        <div className="py-3 md:py-3 md:flex md:items-center md:gap-6">
          <p className="text-xs md:w-20 md:text-base font-bold text-gray-400 md:text-gray-900 uppercase tracking-wider mb-0.5 md:mb-0 shrink-0">
            모집 인원
          </p>
          <p className="font-bold text-gray-900 text-sm md:text-base">
            {members.length} / {detail.maxMembers} 명
          </p>
        </div>

        {/* 데스크탑: 수정/삭제 버튼 */}
        {isHost && (
          <div className="hidden md:flex gap-2 pt-4 border-t-0">
            <Link
              href={ROUTES.MEETUP.EDIT(detail.meetupId)}
              className="flex-1 text-center text-sm font-bold px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              수정
            </Link>
            <button
              disabled={isDeleting}
              onClick={openDialog}
              className="flex-1 text-sm font-bold px-4 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <ConfirmDialog
        dialogRef={dialogRef}
        content={{
          title: '개인행사를 삭제하시겠습니까?',
          description: '삭제된 행사는 복구할 수 없습니다.',
          confirmLabel: '삭제',
          cancelLabel: '취소',
          pendingLabel: '삭제 중...',
        }}
        isPending={isDeleting}
        onConfirm={() => {
          closeDialog();
          onDelete();
        }}
        onCancel={closeDialog}
        onBackdropClick={handleBackdropClick}
      />
    </div>
  );
}
