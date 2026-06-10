export const dynamic = 'force-dynamic';

import { NoticeDetailView } from '@/views/community-board';

interface Props {
  params: Promise<{ noticeId: string }>;
}

export default async function NoticeDetailPage({ params }: Props) {
  const { noticeId } = await params;
  return <NoticeDetailView noticeId={Number(noticeId)} />;
}
