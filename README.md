# LLOWA

> 코스프레 행사 정보, 중고 거래, 모임을 한 곳에서 — 코스플레이어를 위한 커뮤니티 플랫폼

**[라이브 데모 →](https://www.llowa.kr)**

> 데모 모드로 배포되어 있습니다. 서버 연결 없이 목 데이터로 모든 기능을 체험할 수 있습니다.

- `NEXT_PUBLIC_DEMO_MODE=true` 환경 변수로 활성화됩니다.
- API 함수 레벨에서 `IS_DEMO` 분기를 적용해 목 데이터를 반환합니다.

---

## 프로젝트 배경

코스플레이어들은 행사 정보, 의상 거래, 모임을
각각 다른 플랫폼(트위터, 번개장터, 오픈카톡)에서 따로 찾아야 하는 불편함이 있었습니다.
이를 하나의 플랫폼으로 통합한 커뮤니티 서비스를 기획·개발했습니다.

서비스는 아쉽게도 운영되지 못했습니다.
포트폴리오 목적으로 데모 모드를 적용해 배포했으며 지속적인 리팩토링 과정에 있습니다.

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
| 편집 에디터 | Tiptap 3                          |
| 지도        | Kakao Maps SDK                    |
| 테스트      | Vitest, Testing Library           |
| 배포        | Vercel                            |

---

## 아키텍처

[Feature-Sliced Design(FSD)](https://feature-sliced.design/) 아키텍처를 적용했습니다.
프로젝트 루트의 `app/`은 Next.js App Router 전용 라우트 디렉터리이며, FSD 레이어인
`_app`과는 별개입니다(이름 충돌을 피하기 위해 FSD 레이어들은 `_` 접두사를 붙였습니다).

```
src/
├── _app/          # 앱 초기화, 전역 Provider (AuthProvider, AuthGuard, QueryProvider)
├── _pages/        # 페이지 단위 UI 조합 (event, market, inquiry, my-info, signup, login 등)
├── widgets/       # 여러 화면에서 재사용되는 독립 UI 블록 (main-menu, market-sidebar, mobile-header 등)
├── features/      # 사용자 인터랙션 단위 (favorite-event, favorite-meetup, logout, user-profile-form)
├── entities/      # 도메인 단위 모델·UI (chat, event, product, user)
└── shared/        # 공통 유틸·컴포넌트·API·인증 (ui, lib, api, auth, routes, stomp)
```

---

## 기술적 의사결정

**FSD 아키텍처 도입**
페이지가 늘어날수록 컴포넌트 간 의존성이 복잡해지는 문제를 방지하기 위해
Feature-Sliced Design을 적용했습니다. 레이어 간 단방향 참조 규칙 덕분에
새 기능 추가 시 영향 범위를 예측하기 쉬웠습니다.

**Zod를 통한 API 응답 런타임 검증**
TypeScript 타입만으로는 런타임 API 응답의 형태를 보장할 수 없습니다.
모든 API 함수에 Zod 스키마를 함께 정의하고 `WithValidation` 메서드로 응답을 검증해,
예상치 못한 스키마 변경을 조기에 감지할 수 있도록 했습니다.
