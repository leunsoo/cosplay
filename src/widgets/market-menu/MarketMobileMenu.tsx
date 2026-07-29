'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogined } from '@/entities/auth';
import { useAuthStore } from '@/shared/store/authStore';
import { ROUTES } from '@/shared/routes';

export function MarketMobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const logined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (href: string) => {
    setOpen(false);
    if (!logined) {
      router.push(`${ROUTES.LOGIN}?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9"
      >
        <span className="material-symbols-outlined text-gray-600">
          more_vert
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-36 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
          <button
            onClick={() => handleNavigate(ROUTES.PRODUCT.REGISTER)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              refresh
            </span>
            판매하기
          </button>
          <button
            onClick={() => handleNavigate(ROUTES.SELLER.PRODUCTS(userUuid))}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              person
            </span>
            내상점
          </button>
          <button
            onClick={() => handleNavigate(ROUTES.CHAT)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[16px]">
              chat_bubble
            </span>
            채팅
          </button>
        </div>
      )}
    </div>
  );
}
