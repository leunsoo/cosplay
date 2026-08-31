'use client';

import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { useQnaOwnerActions } from '../model/use-qna-owner-actions';

interface QnaDesktopActionsProps {
  post: QnaDetail;
  qnaPostId: number;
}

export function QnaDesktopActions({ post, qnaPostId }: QnaDesktopActionsProps) {
  const { isMyPost, isDeleting, remove } = useQnaOwnerActions(post, qnaPostId);

  if (!isMyPost) return null;

  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href={ROUTES.COMMUNITY.QNA_EDIT(qnaPostId)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">edit</span>
        수정
      </Link>
      <button
        onClick={remove}
        disabled={isDeleting}
        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[16px]">delete</span>
        삭제
      </button>
    </div>
  );
}
