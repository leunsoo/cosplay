'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/core/config';
import { useAuthStore } from '@/shared/store/authStore';

const LOGIN_NEXT_KEY = 'login_next_path';

function isSafeInternalPath(path: string | null): path is string {
  return Boolean(path && path.startsWith('/') && !path.startsWith('//'));
}

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authStatus = useAuthStore((state) => state.authStatus);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (authStatus === 'checking') {
      return;
    }

    if (authStatus === 'unauthenticated') {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (role === 'temp') {
      sessionStorage.removeItem(LOGIN_NEXT_KEY);
      router.replace(ROUTES.REGISTER);
      return;
    }

    const nextFromQuery = searchParams.get('next');
    const nextFromStorage = sessionStorage.getItem(LOGIN_NEXT_KEY);
    const targetPath = isSafeInternalPath(nextFromQuery)
      ? nextFromQuery
      : isSafeInternalPath(nextFromStorage)
        ? nextFromStorage
        : ROUTES.HOME;

    sessionStorage.removeItem(LOGIN_NEXT_KEY);
    router.replace(targetPath);
  }, [authStatus, role, router, searchParams]);

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <AuthCallbackInner />
    </Suspense>
  );
}
