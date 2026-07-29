export const dynamic = 'force-dynamic';

import { QnaDetailPage } from '@/_pages/inquiry/qna-detail';

interface Props {
  params: Promise<{ qnaPostId: string }>;
}

export default async function Page({ params }: Props) {
  const { qnaPostId } = await params;
  return <QnaDetailPage qnaPostId={Number(qnaPostId)} />;
}
