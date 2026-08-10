import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, afterAll, beforeAll, vi } from 'vitest';
import { server } from '@/shared/testing/msw/server';

// server-only는 Next.js 번들러의 react-server export condition에서만
// no-op(empty.js)으로 resolve됨. Vitest는 이 condition을 모르기 때문에
// 기본 export(index.js)가 잡혀 그냥 import만 해도 무조건 throw함 —
// *.server.ts 파일을 테스트하려면 빈 모듈로 목킹 필요.
vi.mock('server-only', () => ({}));

// 각 테스트 후 자동으로 cleanup 실행
afterEach(() => {
  cleanup();
});

// MSW: 핸들러 없는 요청은 warn 대신 즉시 테스트 실패로 처리
// (핸들러 누락을 실제 네트워크 통과로 조용히 숨기지 않기 위함)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
