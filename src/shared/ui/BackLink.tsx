import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label?: string;
}

export function BackLink({ href, label = '목록으로' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 w-fit"
    >
      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
      {label}
    </Link>
  );
}
