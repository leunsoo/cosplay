'use client';

import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/shared/auth';
import { useLogout } from '../model';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';

interface LogoutBtnProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function LogoutBtn({
  className,
  iconClassName,
  textClassName,
}: LogoutBtnProps = {}) {
  const router = useRouter();
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUnauthenticated();
        router.replace(ROUTES.HOME);
      },
      onError: () => {
        alert('로그아웃에 실패했습니다.');
      },
    });
  };

  const isLoggingOut = logoutMutation.isPending;

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60 ${
        className ?? ''
      }`}
    >
      <LogOut className={`w-5 h-5 shrink-0 ${iconClassName ?? ''}`} />
      <span className={`flex-1 text-left ${textClassName ?? ''}`}>
        {isLoggingOut ? '로그아웃 중...' : '로그아웃'}
      </span>
    </button>
  );
}
