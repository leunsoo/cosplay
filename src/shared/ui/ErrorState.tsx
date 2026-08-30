import Link from 'next/link';

const ICON_MAP = {
  error: 'error',
  network: 'wifi_off',
} as const;

interface ErrorStateProps {
  /** 생략하면 아이콘 없이 문구만 표시 */
  icon?: keyof typeof ICON_MAP;
  message?: string;
  description?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
}

export function ErrorState({
  icon,
  message = '정보를 불러오는데 실패했습니다.',
  description,
  onRetry,
  backHref,
  backLabel = '목록으로 돌아가기',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-60 text-gray-400">
      {icon && (
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '48px' }}
        >
          {ICON_MAP[icon]}
        </span>
      )}
      <p className="text-2xl font-medium">{message}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
      {(onRetry || backHref) && (
        <div className="mt-4 flex items-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                refresh
              </span>
              다시 시도
            </button>
          )}
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              {backLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
