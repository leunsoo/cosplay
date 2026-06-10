import { ProductCard } from './ProductCard';
import type { Product } from '../model/types';

interface ProductGridProps {
  products: Product[];
  onProductClick?: (productId: number) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-x-4 md:gap-y-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onClick={
            onProductClick ? () => onProductClick(product.id) : undefined
          }
        />
      ))}
    </div>
  );
}
