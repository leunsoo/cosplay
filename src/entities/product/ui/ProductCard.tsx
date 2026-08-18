import Link from 'next/link';
import { ProductImage } from './ProductImage';
import { Product } from '../model/product';
import { getRelativeTime } from '@/shared/lib/dateTime';
import { ROUTES } from '@/shared/routes';

export function ProductCard({
  id,
  image,
  title,
  price,
  createdAt,
  badges,
}: Product) {
  return (
    <Link
      href={ROUTES.PRODUCT.DETAIL(id)}
      prefetch
      className="group flex flex-col bg-white rounded-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md"
    >
      <ProductImage imageUrl={image} badges={badges} />

      <div className="flex flex-col gap-2 px-2 pt-3 pb-2">
        <h3 className="font-medium text-gray-800 text-sm leading-snug truncate">
          {title}
        </h3>

        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">
              {price.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-gray-900">원</span>
          </div>
          <span className="text-[11px] text-gray-400">
            {getRelativeTime(createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
