import Link from 'next/link';
import { ROUTES } from '@/core/config/routes';

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-60 text-gray-400">
      <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
        production_quantity_limits
      </span>
      <p className="text-2xl font-medium">존재하지 않는 상품입니다.</p>
      <Link
        href={ROUTES.MARKET}
        className="mt-4 flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        목록으로 돌아가기
      </Link>
    </div>
  );
}
