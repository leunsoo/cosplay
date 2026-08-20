'use client';

import { useRouter } from 'next/navigation';
import { useProductDetail } from '@/entities/product';
import { isMe } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import type { ProductDetailResponseDTO } from '@/shared/api/endpoints/product';
import { useUpdateProduct } from '../api/use-update-product';
import { ProductForm } from './ProductForm';
import type { ProductFormValues } from '../model/product-form';

interface ProductEditPageProps {
  productId: number;
}

function buildDefaultValues(
  product: ProductDetailResponseDTO['product']
): Partial<ProductFormValues> {
  return {
    title: product.title,
    price: product.price,
    description: product.description ?? '',
    priceNegotiable: product.priceNegotiable,
    shippingType: product.shippingType === 'SEPARATE' ? 'separate' : 'included',
    standardShipping: product.standardShipping ?? 0,
    directTradeEnabled: product.directTradeEnabled ? 'possible' : 'impossible',
    directTradeLocation: product.directTradeLocation ?? '',
    directTradePlace: product.directTradePlace ?? '',
  };
}

export function ProductEditPage({ productId }: ProductEditPageProps) {
  const router = useRouter();
  const { productDetail, isLoading, error } = useProductDetail(productId);
  const { submit, isPending } = useUpdateProduct({
    productId,
    initialImageUrl: productDetail?.product.mainImageUrl,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error.message}</div>;
  if (!productDetail) return <div>상품을 찾을 수 없습니다.</div>;

  // 본인 상품이 아니면 접근 차단
  if (!isMe(productDetail.seller.uuid)) {
    router.replace(ROUTES.PRODUCT.DETAIL(productId));
    return null;
  }

  return (
    <ProductForm
      defaultValues={buildDefaultValues(productDetail.product)}
      initialImageUrl={productDetail.product.mainImageUrl}
      onSubmit={submit}
      isPending={isPending}
      isEditMode
    />
  );
}
