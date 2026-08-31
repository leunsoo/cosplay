import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { formatDateTime } from '@/shared/ui';

interface QnaAnswerSectionProps {
  post: QnaDetail;
}

export function QnaAnswerSection({ post }: QnaAnswerSectionProps) {
  const answerAtStr = post.answerAt ? formatDateTime(post.answerAt) : null;

  return (
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
  );
}
