'use client';

import { ROUTES } from '@/shared/routes';
import { LoadingState, NotFoundState, BackLink } from '@/shared/ui';
import { useNoticeDetail } from '../api/use-notice-detail';
import { NoticeContent } from './NoticeContent';

interface NoticeDetailViewProps {
  noticeId: number;
}

export function NoticeDetailView({ noticeId }: NoticeDetailViewProps) {
  const { notice, isLoading, error } = useNoticeDetail(noticeId);

  if (isLoading) {
    return <LoadingState message="공지사항을 불러오는 중..." />;
  }

  if (error || !notice) {
    return (
      <NotFoundState
        title="공지사항을 찾을 수 없습니다"
        backHref={ROUTES.COMMUNITY.LIST}
      />
    );
  }

  return (
    <main className="container-custom pt-2 md:pt-8 pb-20">
      <BackLink href={ROUTES.COMMUNITY.LIST} />
      <NoticeContent notice={notice} />
    </main>
  );
}
