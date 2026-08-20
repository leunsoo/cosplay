// 데모 모드는 기본적으로 비로그인 상태에서 시작한다.
// 사용자가 로그인 버튼을 눌러 회원가입(temp → member 전환)을 완료하면,
// 이후 같은 세션(sessionStorage) 동안은 재로그인 시 회원가입을 다시 거치지 않는다.
export const DEMO_REGISTERED_KEY = 'demo-registered';
