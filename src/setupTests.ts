import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, afterAll, beforeAll } from 'vitest';
import { server } from '@/shared/testing/msw/server';

// 각 테스트 후 자동으로 cleanup 실행
afterEach(() => {
  cleanup();
});

// MSW: 핸들러 없는 요청은 warn 대신 즉시 테스트 실패로 처리
// (핸들러 누락을 실제 네트워크 통과로 조용히 숨기지 않기 위함)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
