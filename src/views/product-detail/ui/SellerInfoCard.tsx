import { useRouter } from 'next/navigation';
import { type Seller } from '@/entities/product';
import { UserAvatar } from '@/entities/user';
import { ROUTES } from '@/shared/routes';

interface SellerInfoCardProps {
  seller: Seller;
}

export function SellerInfoCard({ seller }: SellerInfoCardProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 mb-8 border border-gray-100">
      <UserAvatar
        avatarUrl={seller.avatar}
        size="sm"
        className="ring-2 ring-white"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-900 truncate">
            {seller.name}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5"></div>
      </div>
      <button
        onClick={() => router.push(ROUTES.SELLER.PRODUCTS(seller.id))}
        className="text-xs font-bold text-gray-600 border border-gray-300 bg-white px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
      >
        상점방문
      </button>
    </div>
  );
}
