'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { useAuthStore } from '@/shared/auth';
import { IS_DEMO } from '@/shared/lib/is-demo';

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

  // allowRoles가 호출부에서 인라인 배열로 넘어오는 경우가 많아, 매 렌더링마다
  // 새 배열 참조가 생겨 effect가 불필요하게 재실행되는 것을 막기 위해
  // 배열 참조 대신 내용을 문자열로 비교한다.
  const allowRolesKey = allowRoles?.join(',');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allowRolesKey,
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
