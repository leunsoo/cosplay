import { NotFoundState } from '@/shared/ui';
import { ROUTES } from '@/shared/routes';

export default function QnaNotFound() {
  return (
    <NotFoundState
      title="게시글을 찾을 수 없습니다"
      backHref={ROUTES.COMMUNITY.LIST}
    />
  );
}
