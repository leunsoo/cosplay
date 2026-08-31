'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { useQnaOwnerActions } from '../model/use-qna-owner-actions';

interface QnaMobileMenuProps {
  post: QnaDetail;
  qnaPostId: number;
}

export function QnaMobileMenu({ post, qnaPostId }: QnaMobileMenuProps) {
  const { isMyPost, isDeleting, remove } = useQnaOwnerActions(post, qnaPostId);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isMyPost) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9"
      >
        <span className="material-symbols-outlined text-gray-600">
          more_vert
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-36 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
          <Link
            href={ROUTES.COMMUNITY.QNA_EDIT(qnaPostId)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            수정
          </Link>
          <button
            onClick={() => {
              remove();
              setOpen(false);
            }}
            disabled={isDeleting}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              delete
            </span>
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      )}
    </div>
  );
}
