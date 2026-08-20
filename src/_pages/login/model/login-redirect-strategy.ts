import { ROUTES } from '@/shared/routes';
import { DEMO_REGISTERED_KEY } from '@/shared/auth';
import type { LoginProvider } from './login-provider';

const OAUTH_PATHS: Record<LoginProvider, string> = {
  google: '/oauth2/authorization/google-user',
  kakao: '/oauth2/authorization/kakao-user',
  x: '/oauth2/authorization/x-user',
};

export type DemoAuthenticateAs = 'member' | 'temp';

export type LoginRedirectAction =
  | {
      type: 'navigate';
      path: string;
      asReplace: boolean;
      authenticateAs: DemoAuthenticateAs;
      // 콜백 시점에 이어서 사용할 이동 경로. 저장이 필요 없으면 null.
      pathToPersist: string | null;
    }
  | { type: 'oauth-redirect'; url: string; pathToPersist: string | null }
  | { type: 'config-error'; reason: string };

// 데모 모드: 이번 세션에서 이미 회원가입을 완료했다면 곧바로 로그인시키고,
// 아니라면 신규 유저처럼 임시 인증 후 회원가입 페이지로 이동시킨다.
// 회원가입 페이지로 보낼 때만 원래 가려던 경로를 나중에 쓰도록 pathToPersist에 담는다.
export function resolveDemoLoginRedirect(
  nextPath?: string | null
): LoginRedirectAction {
  const isAlreadyRegistered =
    sessionStorage.getItem(DEMO_REGISTERED_KEY) === 'true';

  if (isAlreadyRegistered) {
    return {
      type: 'navigate',
      path: nextPath?.trim() || ROUTES.HOME,
      asReplace: true,
      authenticateAs: 'member',
      pathToPersist: null,
    };
  }

  return {
    type: 'navigate',
    path: ROUTES.REGISTER,
    asReplace: false,
    authenticateAs: 'temp',
    pathToPersist: nextPath?.trim() || null,
  };
}

// 실제 OAuth 흐름: baseURL이 없으면 설정 오류, 있으면 provider별 인가 엔드포인트로 리다이렉트한다.
// 콜백 시점에 이어서 쓸 수 있도록 next 경로를 pathToPersist에 담아 함께 돌려준다.
export function resolveOAuthLoginRedirect(
  provider: LoginProvider,
  nextPath?: string | null
): LoginRedirectAction {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    return {
      type: 'config-error',
      reason: 'NEXT_PUBLIC_API_BASE_URL is not configured',
    };
  }

  const trimmedNextPath = nextPath?.trim() || null;
  const query = trimmedNextPath
    ? `?next=${encodeURIComponent(trimmedNextPath)}`
    : '';
  return {
    type: 'oauth-redirect',
    url: `${baseURL}${OAUTH_PATHS[provider]}${query}`,
    pathToPersist: trimmedNextPath,
  };
}
