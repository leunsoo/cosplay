'use client';

import { useAuthStore } from '@/shared/auth/authStore';

/**
 * 현재 유저가 member 권한으로 로그인한 상태인지 구독합니다.
 *
 * @returns 로그인 여부
 */
export const useLogined = (): boolean => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const role = useAuthStore((state) => state.role);
  return authStatus === 'authenticated' && role === 'member';
};
