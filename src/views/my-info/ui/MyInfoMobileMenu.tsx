'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoutBtn } from '@/features/logout';

interface MyInfoMobileMenuProps {
  onEdit: () => void;
  onWithdraw: () => void;
}

export function MyInfoMobileMenu({
  onEdit,
  onWithdraw,
}: MyInfoMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="absolute right-0 top-11 w-40 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3  text-gray-700 hover:bg-gray-50"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            프로필 수정
          </button>
          <LogoutBtn />
          <button
            onClick={() => {
              onWithdraw();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-3  text-red-600 hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              person_remove
            </span>
            회원 탈퇴
          </button>
        </div>
      )}
    </div>
  );
}
