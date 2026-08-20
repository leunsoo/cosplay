'use client';

import { useRegistProduct } from '../api/use-regist-product';
import { ProductForm } from './ProductForm';

export function ProductRegistPage() {
  const { submit, isPending } = useRegistProduct();

  return (
    <ProductForm onSubmit={submit} isPending={isPending} isEditMode={false} />
  );
}
