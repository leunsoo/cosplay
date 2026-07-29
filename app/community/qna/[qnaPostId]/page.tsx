export const dynamic = 'force-dynamic';

import { QnaDetailView } from '@/_pages/inquiry/qna-detail';

interface Props {
  params: Promise<{ qnaPostId: string }>;
}

export default async function QnaDetailPage({ params }: Props) {
  const { qnaPostId } = await params;
  return <QnaDetailView qnaPostId={Number(qnaPostId)} />;
}
