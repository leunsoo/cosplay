import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',

      // 커스텀 규칙 추가
      // 'no-console': 'warn', // console.log 사용 시 경고
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      'prefer-const': 'warn', // let 대신 const 사용 권장

      '@typescript-eslint/no-unused-vars': 'error', // TypeScript 전용 미사용 변수 검사
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
]);

export default eslintConfig;
