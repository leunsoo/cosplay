import Link from 'next/link';

const ICON_MAP = {
  product: 'production_quantity_limits',
} as const;

interface NotFoundStateProps {
  /** 생략하면 아이콘 없이 문구만 표시 */
  icon?: keyof typeof ICON_MAP;
  title: string;
  description?: string;
  backHref: string;
  backLabel?: string;
}

export function NotFoundState({
  icon,
  title,
  description,
  backHref,
  backLabel = '목록으로 돌아가기',
}: NotFoundStateProps) {
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
      <p className="text-2xl font-medium">{title}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
      <Link
        href={backHref}
        className="mt-4 flex items-center gap-1 px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        {backLabel}
      </Link>
    </div>
  );
}
