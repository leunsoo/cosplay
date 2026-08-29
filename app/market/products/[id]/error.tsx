'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/routes';

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-60 text-gray-400">
      <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
        error
      </span>
      <p className="text-2xl font-medium">상품 정보를 불러오지 못했습니다.</p>
      <p className="text-sm text-gray-400">잠시 후 다시 시도해주세요.</p>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => reset()}
          className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          다시 시도
        </button>
        <Link
          href={ROUTES.MARKET}
          className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
