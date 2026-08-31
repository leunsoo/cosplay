import { QnaEditPage } from '@/_pages/inquiry/qna-write';

interface Props {
  params: Promise<{ qnaPostId: string }>;
}

export default async function Page({ params }: Props) {
  const { qnaPostId } = await params;
  return <QnaEditPage qnaPostId={Number(qnaPostId)} />;
}
