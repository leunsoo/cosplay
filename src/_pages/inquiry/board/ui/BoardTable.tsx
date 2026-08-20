import type { NoticeSummary } from '@/shared/api/endpoints/notice';
import type { QnaSummary } from '@/shared/api/endpoints/qna';
import { NoticeRow } from './NoticeRow';
import { QnaRow } from './QnaRow';

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
      {/* 테이블 헤더 */}
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
