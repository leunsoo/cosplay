import Link from 'next/link';
import { ProductCard, type Product } from '@/entities/product';
import { type Seller } from '@/shared/api/endpoints/product';
import { UserAvatar } from '@/shared/ui';
import { ROUTES } from '@/shared/routes';

interface SellerProductsSectionProps {
  seller: Seller;
  products: Product[];
}

export function SellerProductsSection({
  seller,
  products,
}: SellerProductsSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <UserAvatar
          avatarUrl={seller.avatar}
          name={seller.name}
          size="md"
          className="ring-2 ring-white"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {seller.name}의 판매 물품
          </h3>
        </div>
        <Link
          href={ROUTES.SELLER.PRODUCTS(seller.uuid)}
          className="text-sm font-medium hover:cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
        >
          더보기
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
