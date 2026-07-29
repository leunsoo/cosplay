import Link from 'next/link';

interface NotFoundStateProps {
  title: string;
  backHref: string;
  backLabel?: string;
}

export function NotFoundState({
  title,
  backHref,
  backLabel = '목록으로 돌아가기',
}: NotFoundStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">{title}</h1>
        <Link href={backHref} className="text-primary hover:underline">
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
