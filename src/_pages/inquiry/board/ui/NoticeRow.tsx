import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { formatDate } from '@/shared/ui';
import type { NoticeSummary } from '@/shared/api/endpoints/notice';

interface NoticeRowProps {
  notice: NoticeSummary;
}

export function NoticeRow({ notice }: NoticeRowProps) {
  const dateStr = formatDate(notice.createdAt);

  return (
    <Link
      href={ROUTES.COMMUNITY.NOTICE_DETAIL(notice.id)}
      className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr_120px_100px_70px] gap-2 px-3 md:px-4 py-2.5 md:py-3.5 items-center border-b border-gray-100 last:border-0 hover:bg-amber-50/60 transition-colors bg-amber-50/30"
    >
      <div className="text-center">
        {notice.isImportant ? (
          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-red-500 text-white">
            공지
          </span>
        ) : (
          <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-primary text-white">
            안내
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="truncate text-sm font-semibold text-gray-900">
          {notice.title}
        </span>
      </div>
      <div className="hidden md:block text-center text-sm text-gray-500 truncate">
        운영진
      </div>
      <div className="hidden md:block text-center text-xs text-gray-400">
        {dateStr}
      </div>
      <div className="hidden md:block text-center text-xs text-gray-400">
        {notice.viewCount.toLocaleString()}
      </div>
    </Link>
  );
}
