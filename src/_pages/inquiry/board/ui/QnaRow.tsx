import Link from 'next/link';
import { ROUTES } from '@/shared/routes';
import { formatDate } from '@/shared/ui';
import type { QnaSummary } from '@/shared/api/endpoints/qna';

interface QnaRowProps {
  post: QnaSummary;
  number: number;
}

export function QnaRow({ post, number }: QnaRowProps) {
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
