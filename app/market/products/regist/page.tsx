import { AuthGuard } from '@/_app/providers/AuthGuard';
import { ProductRegistView } from '@/views/product-regist';

export default function ProductRegistPage() {
  return (
    <AuthGuard>
      <ProductRegistView />
    </AuthGuard>
  );
}
