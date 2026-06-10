import { ProductCard, type Product, type Seller } from '@/entities/product';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core/config/routes';
import { UserAvatar } from '@/entities/user';

interface SellerProductsSectionProps {
  seller: Seller;
  products: Product[];
  onViewMore?: () => void;
}

export function SellerProductsSection({
  seller,
  products,
  onViewMore,
}: SellerProductsSectionProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <UserAvatar
          avatarUrl={seller.avatar}
          size="md"
          className="ring-2 ring-white"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">
            {seller.name}의 판매 물품
          </h3>
        </div>
        {onViewMore && (
          <button
            onClick={onViewMore}
            className="text-sm font-medium hover:cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          >
            더보기
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => router.push(ROUTES.PRODUCT.DETAIL(product.id))}
          />
        ))}
      </div>
    </div>
  );
}
