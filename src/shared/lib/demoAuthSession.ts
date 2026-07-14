// 데모 모드는 기본적으로 비로그인 상태에서 시작한다.
// 사용자가 로그인 버튼을 눌러 회원가입(temp → member 전환)을 완료하면,
// 이후 같은 세션(sessionStorage) 동안은 재로그인 시 회원가입을 다시 거치지 않는다.
export const DEMO_REGISTERED_KEY = 'demo-registered';

// 로그인 시도 시점에 원래 가려던 경로를 기억해두는 키.
// 실제 OAuth 흐름과 데모 모드(임시 인증 → 회원가입 → 완료 후 이동)에서 공통으로 사용한다.
export const LOGIN_NEXT_KEY = 'login_next_path';
