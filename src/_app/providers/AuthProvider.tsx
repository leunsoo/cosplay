'use client';

import { useEffect, useRef } from 'react';
import { apiClient } from '@/shared/api';
import { useAuthStore, DEMO_REGISTERED_KEY, reissueToken } from '@/shared/auth';
import { IS_DEMO } from '@/shared/lib/is-demo';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasBootstrapped = useRef(false);
  const setAuthChecking = useAuthStore((state) => state.setAuthChecking);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setDemoAuthenticated = useAuthStore(
    (state) => state.setDemoAuthenticated
  );
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  useEffect(() => {
    if (hasBootstrapped.current) {
      return;
    }

    hasBootstrapped.current = true;

    if (IS_DEMO) {
      // 데모 모드는 기본적으로 비로그인 상태에서 시작한다.
      // 단, 이번 세션 중 이미 회원가입(temp → member)을 완료한 적이 있다면 자동 로그인 유지.
      const registered = sessionStorage.getItem(DEMO_REGISTERED_KEY) === 'true';
      if (registered) {
        setDemoAuthenticated();
      } else {
        setUnauthenticated();
      }
      return;
    }

    let cancelled = false;

    apiClient.setReissueFn(async () => {
      const response = await reissueToken();
      return { accessToken: response.data.accessToken };
    });

    apiClient.setUnauthorizedFn(() => {
      setUnauthenticated();
    });

    const bootstrapAuth = async () => {
      setAuthChecking();

      try {
        const response = await reissueToken();
        if (cancelled) return;
        setAuthenticated(response.data.accessToken);
      } catch {
        if (cancelled) return;
        setUnauthenticated();
      }
    };

    void bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, [
    setAuthenticated,
    setAuthChecking,
    setDemoAuthenticated,
    setUnauthenticated,
  ]);

  return <>{children}</>;
}
