import { ProductEditPage } from '@/_pages/market/product-regist';

interface ProductEditRouteProps {
  params: Promise<{ id: string }>;
}

export default async function ProductEditRoute({
  params,
}: ProductEditRouteProps) {
  const { id } = await params;
  return <ProductEditPage productId={Number(id)} />;
}
