import { AuthGuard } from '@/core/providers/AuthGuard';
import { ProductRegistView } from '@/views/product-regist';

export default function ProductRegistPage() {
  return (
    <AuthGuard>
      <ProductRegistView />
    </AuthGuard>
  );
}
