import { AuthGuard } from '@/_app/providers/AuthGuard';
import { ProductRegistView } from '@/_pages/market/product-regist';

export default function ProductRegistPage() {
  return (
    <AuthGuard>
      <ProductRegistView />
    </AuthGuard>
  );
}
