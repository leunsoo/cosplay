# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷
npm test             # Vitest (watch 모드)
npm run test:run     # Vitest (1회 실행)
npm run coverage     # 커버리지 리포트
```

특정 테스트 파일만 실행:

```bash
npx vitest run src/shared/lib/someUtil.test.ts
```

## 아키텍처: Feature-Sliced Design (FSD)

```
app/          # Next.js App Router (라우팅만 담당, 로직 없음)
src/
├── core/     # 전역 Provider (AuthProvider, QueryProvider, StompProvider)
├── entities/ # 도메인 모델·API·타입 (product, event, user, banner, chat 등)
├── features/ # 단일 사용자 인터랙션 (login, logout, favorite-*, chat, recently-viewed)
├── views/    # 페이지별 UI 조합 (entities + features → 완성된 화면)
├── widgets/  # 독립 UI 블록 (헤더, 레이아웃 등)
└── shared/   # 레이어 간 공통 코드
    ├── api/       # apiClient, authApiClient, serverFetch
    ├── lib/       # 유틸, isDemo.ts
    ├── store/     # authStore (Zustand)
    ├── stomp/     # STOMP WebSocket 클라이언트
    └── ui/        # 공통 컴포넌트
```

**임포트 방향**: 상위 레이어는 하위 레이어만 참조 가능. `features` → `entities` → `shared` (역방향 불가).

## API 호출 패턴

**클라이언트 컴포넌트** → `apiClient` (Axios, JWT 자동 첨부·갱신 인터셉터 포함)

```ts
import { apiClient } from '@/shared/api';
const response = await apiClient.getWithValidation('/api/v1/...', SomeSchema);
```

**서버 컴포넌트 / prefetchQuery** → `serverFetch` (Next.js fetch, ISR 캐싱 지원)

```ts
import { serverFetch } from '@/shared/api';
const response = await serverFetch('/api/v1/...', SomeSchema, {
  revalidate: 60,
});
```

**인증 API** → `authApiClient` (`src/shared/api/authApiClient.ts`)

모든 API 응답 형태:

```ts
interface ApiResponse<T> {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data: T;
  error?: { code: string; details?: unknown };
}
```

새 API 함수를 만들 때는 항상 Zod 스키마를 함께 정의하고 `WithValidation` 메서드를 사용한다.

## 데모 모드 (IS_DEMO 패턴)

```ts
// src/shared/lib/isDemo.ts
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
```

**모든 GET API 함수**에는 IS_DEMO 조기 반환이 필요하다:

```ts
import { IS_DEMO } from '@/shared/lib/isDemo';

export async function getSomething(id: number): Promise<SomethingDTO> {
  if (IS_DEMO) return mockSomething[id] ?? mockSomething[1];
  return apiClient.getWithValidation(`/api/v1/.../${id}`, SomethingDTOSchema);
}
```

**React 컴포넌트에서 IS_DEMO 사용 시 Rules of Hooks 주의**: `if (IS_DEMO) return` 은 반드시 모든 훅 호출 이후에 위치해야 한다. `useEffect` 내부의 IS_DEMO 분기는 괜찮다.

쓰기 작업(뮤테이션)은 클라이언트 상태에만 반영하고 서버 호출을 건너뛰는 방식으로 처리한다 (새로고침 시 초기화).

## 목 데이터

`src/mocks/` 에 위치. 각 도메인별 파일(user.ts, product.ts, event.ts, chat.ts 등)로 분리되어 있고, `index.ts`에서 re-export한다. `DEMO_USER_UUID`는 `user.ts`에서만 export하고 다른 파일은 import해서 사용한다 (중복 export 금지).

## 인증 흐름

- `AuthProvider` (`src/core/providers/AuthProvider.tsx`) 가 앱 초기화 시 쿠키의 refresh token으로 reissue를 시도
- 성공 시 `useAuthStore.setAuthenticated(accessToken)` — JWT 파싱 후 스토어 저장
- 데모 모드: `useAuthStore.setDemoAuthenticated()` — JWT 파싱 없이 고정값 주입
- `AuthGuard` (`src/core/providers/AuthGuard.tsx`) 가 role 기반 접근 제어

## 환경 변수

| 변수                            | 용도                                             |
| ------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_BASE_URL`          | 사이트 URL (sitemap, OG 등)                      |
| `NEXT_PUBLIC_API_BASE_URL`      | 백엔드 API 베이스 URL                            |
| `NEXT_PUBLIC_WS_URL`            | STOMP WebSocket URL                              |
| `NEXT_PUBLIC_KAKAO_MAP_APP_KEY` | 카카오 지도 JS 키                                |
| `NEXT_PUBLIC_DEMO_MODE`         | `true` 시 IS_DEMO 활성화                         |
| `OTEL_PROXY_URL`                | OpenTelemetry Tempo 주소 (미설정 시 traces 무시) |

로컬 개발: `.env.development` / 프로덕션: Vercel 대시보드에서 관리. 소스코드에 fallback 값을 하드코딩하지 않는다 (`process.env.VAR!` 형태 사용).

## 경로 별칭

- `@/*` → `src/*`
- `@/app/*` → `app/*`

## **반드시 지켜야 할 점**

- 단순히 문제 해결에 급급한 코드를 작성하지 마십시오. 더 효율적인 대안들에 대해 생각해야 하며, 작성하는 코드에 대한 근거와 이유를 설명합니다.
- lint / prettier / 포맷 경고는 무시합니다.
- **주석을 제거하지 마세요.** 기존 주석은 그대로 보존합니다.
- 같은 이름의 컴포넌트가 다른 경로에 중복되지 않게 합니다. 도메인을 드러내는 이름을 사용하세요.
