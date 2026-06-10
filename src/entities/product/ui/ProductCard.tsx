import { ProductImage } from './ProductImage';
import { Product } from '../model';
import { getRelativeTime } from '@/shared/lib/dateTime';

interface ProductCardProps extends Product {
  onClick?: () => void;
}

export function ProductCard({
  image,
  title,
  price,
  createdAt,
  badges,
  onClick,
}: ProductCardProps) {
  return (
    <div
      className="group flex flex-col bg-white rounded-md overflow-hidden border border-gray-200 transition-all duration-300 cursor-pointer hover:shadow-md"
      onClick={onClick}
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
    </div>
  );
}
