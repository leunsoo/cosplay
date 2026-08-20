'use client';

import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { useLogined } from '@/shared/auth';
import { useNoticeList } from '../api/use-notice-list';
import { useQnaList } from '../api/use-qna-list';
import { BoardTable } from './BoardTable';
import { MobileFab } from '@/shared/ui';

export function BoardPage() {
  const isLogined = useLogined();
  const { notices, isLoading: isLoadingNotices } = useNoticeList();
  const { qnaPosts, isLoading: isLoadingQna } = useQnaList();

  return (
    <main className="container-custom pt-4 md:pt-8 pb-24 min-h-screen">
      {isLogined && (
        <MobileFab href={ROUTES.COMMUNITY.WRITE} icon="edit" label="질문하기" />
      )}
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          공지사항을 확인하고, 운영진에게 질문을 남겨보세요.
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          다함께 사이트를 만들어가기 위한 페이지입니다.
        </p>
        {isLogined && (
          <Link
            href={ROUTES.COMMUNITY.WRITE}
            className="hidden md:flex shrink-0 ml-4 items-center gap-1.5 bg-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-xs"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            질문하기
          </Link>
        )}
      </div>

      {/* 테이블 */}
      <BoardTable
        notices={notices}
        qnaPosts={qnaPosts}
        isLoadingNotices={isLoadingNotices}
        isLoadingQna={isLoadingQna}
      />
    </main>
  );
}
