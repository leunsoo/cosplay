'use client';

import { use } from 'react';
import { useProductDetail } from '@/entities/product';
import { ProductRegistView } from '@/views/product-regist';
import { isMe } from '@/entities/auth';
import { useRouter } from 'next/navigation';

interface ProductEditPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const { id } = use(params);
  const productId = Number(id);
  const router = useRouter();

  const { productDetail, isLoading, error } = useProductDetail(productId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;
  if (!productDetail) return <div>상품을 찾을 수 없습니다.</div>;

  // 본인 상품이 아니면 접근 차단
  if (!isMe(productDetail.seller.id)) {
    router.replace(`/market/products/${productId}`);
    return null;
  }

  const { product } = productDetail;

  return (
    <ProductRegistView
      productId={productId}
      initialImageUrl={product.image}
      defaultValues={{
        title: product.title,
        price: product.price,
        description: product.description ?? '',
        priceNegotiable: product.priceNegotiable,
        shippingType:
          product.shippingType === 'SEPARATE' ? 'separate' : 'included',
        standardShipping: product.standardShipping ?? 0,
        directTradeEnabled: product.directTradeEnabled
          ? 'possible'
          : 'impossible',
        directTradeLocation: product.directTradeLocation ?? '',
        directTradePlace: product.directTradePlace ?? '',
      }}
    />
  );
}
