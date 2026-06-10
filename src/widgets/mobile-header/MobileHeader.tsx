'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/core/config';

const CUSTOM_HEADER_PATHS = [
  ROUTES.MY_INFO,
  ROUTES.MEETUP.DETAIL(''),
  ROUTES.COMMUNITY.QNA_DETAIL(''),
  ROUTES.MARKET,
];

interface MobileHeaderProps {
  actions?: React.ReactNode;
}

function MobileHeaderBase({ actions }: MobileHeaderProps) {
  return (
    <div className="md:hidden sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="container-custom h-14 flex items-center justify-between">
        <Link href={ROUTES.HOME}>
          <h1 className="text-slate-900 text-xl font-black tracking-tight">
            LLOWA
          </h1>
        </Link>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>
    </div>
  );
}

export function MobileHeader({ actions }: MobileHeaderProps) {
  const pathname = usePathname();

  if (CUSTOM_HEADER_PATHS.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return <MobileHeaderBase actions={actions} />;
}

export function MobileHeaderCustom({ actions }: MobileHeaderProps) {
  return <MobileHeaderBase actions={actions} />;
}
