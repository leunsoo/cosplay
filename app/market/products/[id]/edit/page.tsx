'use client';

import { use } from 'react';
import { ProductEditPage } from '@/_pages/market/product-regist';

interface ProductEditRouteProps {
  params: Promise<{ id: string }>;
}

export default function ProductEditRoute({ params }: ProductEditRouteProps) {
  const { id } = use(params);
  return <ProductEditPage productId={Number(id)} />;
}
