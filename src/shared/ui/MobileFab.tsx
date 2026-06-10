import Link from 'next/link';

interface MobileFabProps {
  href: string;
  icon?: string;
  label?: string;
}

export function MobileFab({ href, icon = 'add', label }: MobileFabProps) {
  return (
    <Link
      href={href}
      className="md:hidden fixed bottom-25 right-6 z-50 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center gap-2 px-4"
    >
      <span className="material-symbols-outlined text-[28px]">{icon}</span>
      {label && <span className="font-bold text-sm pr-1">{label}</span>}
    </Link>
  );
}
