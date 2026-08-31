import Link from 'next/link';
import type { ReactNode } from 'react';
import { ImageWithFallback } from '@/shared/ui';

interface SummaryCardShellProps {
  href: string;
  imageUrl: string;
  badges: ReactNode;
  favoriteButton: ReactNode;
  title: string;
  infoRows: ReactNode;
  tags?: ReactNode;
}

export function SummaryCardShell({
  href,
  imageUrl,
  badges,
  favoriteButton,
  title,
  infoRows,
  tags,
}: SummaryCardShellProps) {
  return (
    <Link href={href}>
      <article className="group relative flex flex-col md:flex-row bg-white rounded-md md:rounded-xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all shadow-card hover:shadow-card-hover cursor-pointer">
        {/* 이미지 */}
        <div className="md:w-60 aspect-square relative overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex gap-1">{badges}</div>
          {/* 찜 버튼 — 모바일에서만 이미지 우측 상단 */}
          <div
            className="md:hidden absolute top-3 right-3"
            onClick={(e) => e.preventDefault()}
          >
            {favoriteButton}
          </div>
        </div>

        {/* 내용 */}
        <div className="flex-1 p-3 md:p-6 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-900 text-lg md:text-xl font-bold group-hover:text-primary transition-colors leading-tight truncate">
              {title}
            </h3>
            {/* 찜 버튼 — 데스크톱에서만 내용 영역 우측 */}
            <div
              className="hidden md:block"
              onClick={(e) => e.preventDefault()}
            >
              {favoriteButton}
            </div>
          </div>

          {/* 정보 목록 */}
          <div className="flex flex-col gap-1 md:gap-4 text-sm text-gray-600 md:my-3">
            {infoRows}
          </div>

          {/* 태그 */}
          {tags && (
            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
              {tags}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
