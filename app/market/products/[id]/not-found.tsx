import { NotFoundState } from '@/shared/ui';
import { ROUTES } from '@/shared/routes';

export default function ProductNotFound() {
  return (
    <NotFoundState
      icon="product"
      title="존재하지 않는 상품입니다."
      backHref={ROUTES.MARKET}
    />
  );
}
