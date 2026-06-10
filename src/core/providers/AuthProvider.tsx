'use client';

import { useEffect, useRef } from 'react';
import { apiClient } from '@/shared/api';
import { useAuthStore } from '@/shared/store/authStore';
import { reissueToken } from '@/entities/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hasBootstrapped = useRef(false);
  const setAuthChecking = useAuthStore((state) => state.setAuthChecking);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  useEffect(() => {
    if (hasBootstrapped.current) {
      return;
    }

    hasBootstrapped.current = true;
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
  }, [setAuthenticated, setAuthChecking, setUnauthenticated]);

  return <>{children}</>;
}
