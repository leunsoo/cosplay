import { ROUTES } from '@/shared/routes';
import { NotFoundState, BackLink } from '@/shared/ui';
import { getNoticeDetailServer } from '@/shared/api/endpoints/notice/index.server';
import { NoticeContent } from './NoticeContent';

interface NoticeDetailPageProps {
  noticeId: number;
}

export async function NoticeDetailPage({ noticeId }: NoticeDetailPageProps) {
  const notice = await getNoticeDetailServer(noticeId)
    .then((res) => res.data)
    .catch(() => null);

  if (!notice) {
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
