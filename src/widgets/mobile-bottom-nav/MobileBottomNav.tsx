'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { useLogined } from '@/entities/auth';

const NAV_ITEMS = [
  { label: '행사 일정', icon: 'event', href: ROUTES.HOME },
  { label: '코스마켓', icon: 'storefront', href: ROUTES.MARKET },
  { label: '문의하기', icon: 'help', href: ROUTES.COMMUNITY.LIST },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const logined = useLogined();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around h-18">
        {NAV_ITEMS.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[10px] font-medium transition-colors ${
              isActive(href) ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {icon}
            </span>
            {label}
          </Link>
        ))}

        {/* MY 탭 — 로그인 시 내 정보, 비로그인 시 로그인 페이지 */}
        <Link
          href={logined ? ROUTES.MY_INFO : ROUTES.LOGIN}
          className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[10px] font-medium transition-colors ${
            pathname.startsWith(ROUTES.MY_INFO)
              ? 'text-primary'
              : 'text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">person</span>
          MY
        </Link>
      </div>
    </nav>
  );
}
