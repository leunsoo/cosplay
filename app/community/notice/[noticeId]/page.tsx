export const dynamic = 'force-dynamic';

import { NoticeDetailPage } from '@/_pages/inquiry/notice-detail';

interface Props {
  params: Promise<{ noticeId: string }>;
}

export default async function Page({ params }: Props) {
  const { noticeId } = await params;
  return <NoticeDetailPage noticeId={Number(noticeId)} />;
}
