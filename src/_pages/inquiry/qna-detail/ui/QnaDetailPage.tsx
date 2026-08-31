import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { QnaInteractiveSection } from './QnaInteractiveSection';
import { QnaAnswerSection } from './QnaAnswerSection';

interface QnaDetailPageProps {
  qnaPostId: number;
  post: QnaDetail;
}

export function QnaDetailPage({ qnaPostId, post }: QnaDetailPageProps) {
  return (
    <QnaInteractiveSection
      post={post}
      qnaPostId={qnaPostId}
      answerSection={<QnaAnswerSection post={post} />}
    />
  );
}
