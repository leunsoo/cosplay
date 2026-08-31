import { ROUTES } from '@/shared/routes';
import { BackLink } from '@/shared/ui';
import { MobileHeaderCustom } from '@/widgets/mobile-header';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { QnaContent } from './QnaContent';
import { QnaMobileMenu } from './QnaMobileMenu';

interface QnaDetailPageProps {
  qnaPostId: number;
  post: QnaDetail;
}

export function QnaDetailPage({ qnaPostId, post }: QnaDetailPageProps) {
  return (
    <>
      <MobileHeaderCustom
        actions={<QnaMobileMenu post={post} qnaPostId={qnaPostId} />}
      />
      <main className="container-custom pt-2 md:pt-8 pb-20">
        <BackLink href={ROUTES.COMMUNITY.LIST} />
        <QnaContent post={post} qnaPostId={qnaPostId} />
      </main>
    </>
  );
}
