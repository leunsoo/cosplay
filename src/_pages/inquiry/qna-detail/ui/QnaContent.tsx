import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { formatDateTime } from '@/shared/ui';
import { QnaDesktopActions } from './QnaDesktopActions';

interface QnaContentProps {
  post: QnaDetail;
  qnaPostId: number;
}

export function QnaContent({ post, qnaPostId }: QnaContentProps) {
  const updatedAtStr = formatDateTime(post.updatedAt);
  const answerAtStr = post.answerAt ? formatDateTime(post.answerAt) : null;

  return (
    <div className="space-y-4">
      {/* 질문 */}
      <article className="bg-white md:border md:border-gray-200 md:rounded-xl p-0 md:p-8">
        {/* 제목 */}
        <div className="mb-4 px-2 md:px-0 pt-4 md:pt-0">
          <h1 className="text-md md:text-2xl font-bold md:font-black text-gray-900">
            {post.title}
          </h1>
        </div>

        {/* 메타 + 데스크탑 버튼 */}
        <div className="flex flex-wrap items-center justify-between gap-y-1 pb-4 border-b border-gray-100 mb-6 px-2 md:px-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                person
              </span>
              {post.inquirer}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              {updatedAtStr}
            </span>
          </div>

          <QnaDesktopActions post={post} qnaPostId={qnaPostId} />
        </div>

        {/* 본문 */}
        <div className="px-2 md:px-0 pb-2 md:pb-0">
          <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap min-h-30">
            {post.content}
          </div>
        </div>
      </article>

      {/* 답변 */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-3 bg-primary/5 border-b border-gray-200">
          <span className="material-symbols-outlined text-[18px] text-primary">
            support_agent
          </span>
          <span className="text-sm font-bold text-primary">답변</span>
        </div>

        {post.answer ? (
          <div className="px-6 py-6 bg-primary/5">
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
              {post.answer}
            </p>
            {answerAtStr && (
              <p className="mt-4 text-xs text-gray-400 text-right">
                {answerAtStr}
              </p>
            )}
          </div>
        ) : (
          <div className="px-6 py-8 flex items-center gap-2 text-gray-400 text-sm">
            <span className="material-symbols-outlined text-[18px]">
              hourglass_empty
            </span>
            아직 답변이 등록되지 않았습니다.
          </div>
        )}
      </div>
    </div>
  );
}
