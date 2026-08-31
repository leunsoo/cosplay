import { notFound } from 'next/navigation';
import { getQnaDetailServer } from '@/shared/api/endpoints/qna/index.server';
import { QnaDetailPage } from '@/_pages/inquiry/qna-detail';

interface Props {
  params: Promise<{ qnaPostId: string }>;
}

export default async function Page({ params }: Props) {
  const { qnaPostId } = await params;
  const response = await getQnaDetailServer(Number(qnaPostId));

  if (!response) {
    notFound();
  }

  return <QnaDetailPage qnaPostId={Number(qnaPostId)} post={response.data} />;
}
