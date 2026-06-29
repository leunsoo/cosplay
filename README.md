# LLOWA

> 코스프레 행사 정보, 중고 거래, 모임을 한 곳에서 — 코스플레이어를 위한 커뮤니티 플랫폼

**[라이브 데모 →](https://www.llowa.kr)**

> 데모 모드로 배포되어 있습니다. 서버 연결 없이 목 데이터로 모든 기능을 체험할 수 있습니다.

---

## 주요 기능

- **행사** — 코스프레 행사 목록 조회 및 상세 페이지, 행사 즐겨찾기
- **밋업** — 소규모 코스프레 모임 생성·참가·탈퇴, 멤버 목록, 그룹 채팅
- **마켓** — 코스프레 의상·소품 중고 거래, 상품 등록·수정·삭제, 거래 채팅
- **채팅** — STOMP 기반 실시간 1:1 거래 채팅 / 그룹 채팅
- **커뮤니티** — 공지사항, Q&A 게시판
- **마이페이지** — 프로필 편집, 즐겨찾기, 최근 본 상품, 계정 설정

---

## 기술 스택

| 분류        | 기술                              |
| ----------- | --------------------------------- |
| Framework   | Next.js 16 (App Router), React 19 |
| Language    | TypeScript 5                      |
| Styling     | Tailwind CSS 4                    |
| 상태 관리   | Zustand 5                         |
| 서버 상태   | TanStack Query 5                  |
| 유효성 검사 | Zod 4, React Hook Form 7          |
| 실시간 통신 | STOMP / SockJS                    |
| 에디터      | Tiptap 3                          |
| 지도        | Kakao Maps SDK                    |
| 모니터링    | OpenTelemetry (OTLP)              |
| 테스트      | Vitest, Testing Library           |
| 배포        | Vercel                            |

---

## 아키텍처

[Feature-Sliced Design(FSD)](https://feature-sliced.design/) 아키텍처를 적용했습니다.

```
src/
├── core/          # 앱 초기화, 전역 Provider (AuthProvider, QueryProvider 등)
├── entities/      # 도메인 단위 모델·API (user, product, event, banner 등)
├── features/      # 사용자 인터랙션 단위 (login, logout, favorite, chat 등)
├── views/         # 페이지 단위 UI 조합 (page component)
├── widgets/       # 여러 feature를 조합한 독립 UI 블록 (헤더, 사이드바 등)
└── shared/        # 공통 유틸·컴포넌트·훅·스토어 (ui, lib, api, store 등)
```

---

## 데모 모드

서버 없이 실행할 수 있도록 데모 모드를 구현했습니다.

- `NEXT_PUBLIC_DEMO_MODE=true` 환경 변수로 활성화
- 모든 GET API 함수에 `IS_DEMO` 분기를 적용해 목 데이터 반환
- 인증은 JWT 파싱 없이 Zustand 스토어에 데모 유저 정보 직접 주입
- STOMP WebSocket 연결 비활성화
- 로그인 버튼 클릭 시 데모 모드 안내 알림 표시

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.development 참고)
# NEXT_PUBLIC_DEMO_MODE=true 로 설정하면 백엔드 없이 실행 가능

# 개발 서버 실행
npm run dev
```

```bash
# 테스트
npm test

# 빌드
npm run build
```
