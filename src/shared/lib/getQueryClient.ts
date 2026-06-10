import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * 서버 컴포넌트에서 사용할 QueryClient를 반환합니다.
 *
 * React의 cache()로 감싸는 이유:
 * - 서버에서 요청(Request) 하나당 QueryClient 인스턴스를 하나만 생성
 * - 같은 요청 내에서 여러 서버 컴포넌트가 호출해도 동일한 인스턴스를 공유
 * - 요청이 끝나면 자동으로 폐기 (메모리 누수 없음)
 *
 * 클라이언트에서는 QueryProvider 내부의 QueryClient를 사용하므로
 * 이 함수는 서버 컴포넌트(page.tsx 등)에서만 호출합니다.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          gcTime: 1000 * 60 * 5,
          retry: 1,
        },
      },
    })
);
