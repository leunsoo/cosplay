import { AuthGuard } from '@/_app/providers/AuthGuard';
import { ProductRegistPage } from '@/_pages/market/product-regist';

export default function ProductRegistRoute() {
  return (
    <AuthGuard>
      <ProductRegistPage />
    </AuthGuard>
  );
}
