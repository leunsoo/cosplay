import { z, ZodError } from 'zod';
import { type ApiResponse } from './response';

/**
 * 서버 컴포넌트 전용 fetch 함수
 *
 * 기존 apiClient(axios)는 내부적으로 Zustand(useAuthStore)를 참조하므로
 * 서버 컴포넌트에서 직접 사용할 수 없습니다.
 * 이 함수는 토큰이 필요 없는 공개 API를 서버 컴포넌트 / prefetchQuery에서
 * 호출할 때 사용합니다.
 *
 * axios 대신 Next.js fetch를 사용하는 이유:
 * - next.revalidate : N초마다 캐시를 자동 갱신 (ISR)
 * - next.tags       : revalidateTag()로 특정 캐시만 수동 무효화 가능
 * - 위 두 기능은 axios에서 사용 불가능
 *
 * @param url      - API 경로 (예: '/api/v1/events')
 * @param schema   - 응답 data 필드를 검증할 Zod 스키마 (기존 apiClient와 동일하게 적용)
 * @param options  - Next.js fetch 전용 캐싱 옵션
 */
export async function serverFetch<T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: {
    revalidate?: number; // N초마다 캐시 갱신. 미지정 시 기본 캐시 정책 사용
    tags?: string[]; // 캐시 태그 (revalidateTag()로 수동 무효화 시 사용)
    cache?: RequestCache; // 'force-cache'(영구 캐시) | 'no-store'(캐시 없음)
  }
): Promise<ApiResponse<T>> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
    ...(options?.cache && { cache: options.cache }),
  });

  if (!response.ok) {
    throw new Error(`serverFetch 실패: ${response.status} ${url}`);
  }

  const rawJson = await response.json();
  const json: ApiResponse<unknown> =
    typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;

  // 기존 apiClient와 동일하게 Zod로 응답 data 필드 검증
  let validatedData: T;
  try {
    validatedData = schema.parse(json.data);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(`[ZodError] GET ${url}`, err.issues);
    }
    throw err;
  }

  return { ...json, data: validatedData };
}
