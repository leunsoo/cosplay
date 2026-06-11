'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/core/config';
import { useAuthStore } from '@/shared/store/authStore';
import { IS_DEMO } from '@/shared/lib/isDemo';

interface AuthGuardProps {
  children: React.ReactNode;
  allowRoles?: string[];
  forbiddenRedirectTo?: string;
}

function AuthGuardInner({
  children,
  allowRoles,
  forbiddenRedirectTo = ROUTES.HOME,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authStatus = useAuthStore((state) => state.authStatus);
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (IS_DEMO) return;

    if (authStatus === 'checking') {
      return;
    }

    if (authStatus === 'unauthenticated') {
      const query = searchParams.toString();
      const nextPath = `${pathname}${query ? `?${query}` : ''}`;
      router.replace(`${ROUTES.LOGIN}?next=${encodeURIComponent(nextPath)}`);
      return;
    }

    if (allowRoles && !allowRoles.includes(role ?? '')) {
      router.replace(forbiddenRedirectTo);
    }
  }, [
    allowRoles,
    authStatus,
    forbiddenRedirectTo,
    pathname,
    role,
    router,
    searchParams,
  ]);

  if (IS_DEMO) return <>{children}</>;

  if (authStatus === 'checking') {
    return null;
  }

  if (authStatus === 'unauthenticated') {
    return null;
  }

  if (allowRoles && !allowRoles.includes(role ?? '')) {
    return null;
  }

  return <>{children}</>;
}

export function AuthGuard(props: AuthGuardProps) {
  return (
    <Suspense>
      <AuthGuardInner {...props} />
    </Suspense>
  );
}
