// 로그인 시도 시점에 원래 가려던 경로를 기억해두는 키.
// 실제 OAuth 흐름과 데모 모드(임시 인증 → 회원가입 → 완료 후 이동)에서 공통으로 사용한다.
const LOGIN_REDIRECT_PATH_KEY = 'login_next_path';

// 로그인 완료 후 이동할 경로를 세션에 저장한다. 빈 값이면 기존 값을 지운다.
export function saveLoginRedirectPath(path?: string | null) {
  const trimmed = path?.trim();
  if (trimmed) {
    sessionStorage.setItem(LOGIN_REDIRECT_PATH_KEY, trimmed);
  } else {
    sessionStorage.removeItem(LOGIN_REDIRECT_PATH_KEY);
  }
  return trimmed;
}

// 저장된 경로를 읽고, 다시 쓰이지 않도록 즉시 제거한다.
export function consumeLoginRedirectPath(): string | null {
  const path = sessionStorage.getItem(LOGIN_REDIRECT_PATH_KEY);
  sessionStorage.removeItem(LOGIN_REDIRECT_PATH_KEY);
  return path;
}
