'use client';

import { useState } from 'react';
import { PageStepper } from '@/shared/ui';
import { UserAvatar } from '@/entities/user/ui';
import { useMeetupDetail } from '../model/hooks/useMeetupDetail';
import { useMeetupMembers } from '../model/hooks/useMeetupMembers';

const PAGE_SIZE = 5;

interface MeetUpParticipantsProps {
  meetupId: number;
}

export function MeetUpParticipants({ meetupId }: MeetUpParticipantsProps) {
  const { detail } = useMeetupDetail(meetupId);
  const { members } = useMeetupMembers(meetupId);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(members.length / PAGE_SIZE);
  const paginated = members.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex justify-start gap-2 items-center bg-gray-50/50">
        <h2 className="pl-2 text-gray-900 text-sm font-bold">참여자</h2>
        <span className="text-xs font-bold text-primary">
          {members.length} / {detail?.maxMembers ?? 0}
        </span>
      </div>
      <div className="p-3">
        <div className="min-h-60 space-y-0.5">
          {paginated.map((member) => (
            <div
              key={member.user.uuid}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50"
            >
              <UserAvatar
                avatarUrl={member.user.profileImageUrl ?? null}
                size="xs"
              />
              <p className="text-gray-800 font-medium text-sm">
                {member.user.nickname}
              </p>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <PageStepper
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
