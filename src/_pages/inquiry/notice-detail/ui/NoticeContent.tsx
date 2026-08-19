import type { NoticeDetail } from '@/shared/api/endpoints/notice';
import { formatDateTime } from '@/shared/ui';

interface NoticeContentProps {
  notice: NoticeDetail;
}

export function NoticeContent({ notice }: NoticeContentProps) {
  const dateStr = formatDateTime(notice.createdAt);

  return (
    <article className="bg-white md:border md:border-gray-200 md:rounded-xl p-0 md:p-8">
      {/* 제목 */}
      <div className="mb-4 flex items-start gap-2 px-4 md:px-0 pt-4 md:pt-0">
        {notice.isImportant && (
          <span className="shrink-0 inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-500 text-white">
            공지
          </span>
        )}
        <h1 className="text-xl md:text-2xl font-black text-gray-900">
          {notice.title}
        </h1>
      </div>

      {/* 메타 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 pb-4 border-b border-gray-100 mb-6 px-4 md:px-0">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">person</span>
          운영진
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">
            visibility
          </span>
          {notice.viewCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">
            schedule
          </span>
          {dateStr}
        </span>
      </div>

      {/* 본문 */}
      <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap min-h-30 px-4 md:px-0 pb-4 md:pb-0">
        {notice.content}
      </div>
    </article>
  );
}
