import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // .env* 파일은 전부 gitignore 대상이라 CI/다른 머신에는 존재하지 않음
    // serverFetch가 절대 URL을 조립하려면 이 값이 항상 필요하므로 커밋되는 설정에 명시
    env: {
      NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8080',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // 커버리지 측정 대상 파일 명시
      include: ['src/**/*.{ts,tsx}'],
      // 커버리지에서 제외할 파일들
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/shared/testing/**',
        // 설정 파일
        '**/*.config.*',
        '**/*.d.ts',
        '**/.*',
        // 빌드 결과물
        'dist/',
        '.next/',
        'coverage/',
        // 테스트 파일 자체
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/__tests__/**',
        // 타입 정의만 있는 파일
        '**/types.ts',
        '**/index.ts',
        // Next.js 앱 라우터 (페이지 컴포넌트)
        'src/app/**',
      ],
      // 커버리지 임계값 (선택적)
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
