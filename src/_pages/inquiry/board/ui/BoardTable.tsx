import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { formatDate } from '@/shared/ui';
import type { NoticeSummary } from '@/shared/api/notice';
import type { QnaSummary } from '@/shared/api/qna';

interface BoardTableProps {
  notices: NoticeSummary[];
  qnaPosts: QnaSummary[];
  isLoadingNotices: boolean;
  isLoadingQna: boolean;
}

export function BoardTable({
  notices,
  qnaPosts,
  isLoadingNotices,
  isLoadingQna,
}: BoardTableProps) {
  const isLoading = isLoadingNotices || isLoadingQna;

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
      {/* 헤더 */}
      <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_70px] gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
        <span className="text-center">구분</span>
        <span>제목</span>
        <span className="text-center">작성자</span>
        <span className="text-center">날짜</span>
        <span className="text-center">조회</span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* 공지사항 행 */}
          {notices.map((notice) => (
            <NoticeRow key={`notice-${notice.id}`} notice={notice} />
          ))}

          {/* 구분선 */}
          {notices.length > 0 && <div className="border-t-2 border-gray-200" />}

          {/* Q&A 행 */}
          {qnaPosts.length === 0 ? (
            <p className="text-center py-16 text-gray-400 text-sm">
              아직 등록된 질문이 없습니다.
            </p>
          ) : (
            qnaPosts.map((post, idx) => (
              <QnaRow
                key={`qna-${post.id}`}
                post={post}
                number={qnaPosts.length - idx}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

function NoticeRow({ notice }: { notice: NoticeSummary }) {
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

function QnaRow({ post, number }: { post: QnaSummary; number: number }) {
  const dateStr = formatDate(post.updatedAt);

  return (
    <Link
      href={ROUTES.COMMUNITY.QNA_DETAIL(post.id)}
      className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr_120px_100px_70px] gap-2 px-3 md:px-4 py-2.5 md:py-3.5 items-center border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
    >
      <div className="text-center text-sm text-gray-400">{number}</div>
      <div className="flex items-center gap-2 min-w-0">
        <span className="truncate text-sm font-medium text-gray-800">
          {post.title}
        </span>
        {post.isAnswer ? (
          <span className="shrink-0 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
            답변완료
          </span>
        ) : (
          <span className="shrink-0 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500">
            대기중
          </span>
        )}
      </div>
      <div className="hidden md:block text-center text-sm text-gray-500 truncate">
        {post.inquirer}
      </div>
      <div className="hidden md:block text-center text-xs text-gray-400">
        {dateStr}
      </div>
      <div className="hidden md:block text-center text-xs text-gray-400">—</div>
    </Link>
  );
}
