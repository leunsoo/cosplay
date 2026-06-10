export const dynamic = 'force-dynamic';

import { QnaDetailView } from '@/views/community-board';

interface Props {
  params: Promise<{ qnaPostId: string }>;
}

export default async function QnaDetailPage({ params }: Props) {
  const { qnaPostId } = await params;
  return <QnaDetailView qnaPostId={Number(qnaPostId)} />;
}
