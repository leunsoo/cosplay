'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ZodError } from 'zod';
import { AuthProvider } from './AuthProvider';

/**
 * 클라이언트 전체에 QueryClient를 제공하는 Provider
 *
 * [HydrationBoundary를 여기서 쓰지 않는 이유]
 * HydrationBoundary는 서버에서 prefetch한 데이터를 클라이언트 캐시에 주입하는 역할입니다.
 * 주입할 데이터(dehydratedState)는 페이지마다 다르기 때문에,
 * 전역 layout이 아닌 각 page.tsx에서 직접 HydrationBoundary를 사용합니다.
 *
 * 사용 예시 (app/event/page.tsx):
 *   const queryClient = getQueryClient()                // 서버용 QueryClient 생성
 *   await queryClient.prefetchQuery({ ... })            // 서버에서 API 미리 호출
 *   <HydrationBoundary state={dehydrate(queryClient)}> // 클라이언트 캐시에 주입
 *     <EventListPage />                                  // useQuery가 캐시에서 즉시 읽음
 *   </HydrationBoundary>
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 1000 * 60 * 5,
            retry: 1,
          },
        },
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            if (error instanceof ZodError) {
              console.error(
                '[ZodError] useQuery 응답 검증 실패:',
                error.issues
              );
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            if (error instanceof ZodError) {
              console.error(
                '[ZodError] useMutation 응답 검증 실패:',
                error.issues
              );
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
