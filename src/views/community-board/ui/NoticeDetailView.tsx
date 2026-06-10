'use client';

import Link from 'next/link';
import { ROUTES } from '@/core/config/routes';
import { useNoticePost } from '../model/hooks/useNoticePost';
import { NoticeContent } from './components/NoticeContent';

interface NoticeDetailViewProps {
  noticeId: number;
}

export function NoticeDetailView({ noticeId }: NoticeDetailViewProps) {
  const { notice, isLoading, error } = useNoticePost(noticeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            공지사항을 찾을 수 없습니다
          </h1>
          <Link
            href={ROUTES.COMMUNITY.LIST}
            className="text-primary hover:underline"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container-custom pt-2 md:pt-8 pb-20">
      <Link
        href={ROUTES.COMMUNITY.LIST}
        className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 w-fit"
      >
        <span className="material-symbols-outlined text-[16px]">
          arrow_back
        </span>
        목록으로
      </Link>

      <NoticeContent notice={notice} />
    </main>
  );
}
