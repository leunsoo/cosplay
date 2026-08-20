import type { UserProfileDTO } from '@/shared/api/endpoints/user';

export const DEMO_USER_UUID = 'demo-user-uuid-0000';

const DEFAULT_MY_PROFILE: UserProfileDTO = {
  uuid: DEMO_USER_UUID,
  nickname: '데모유저',
  name: '홍길동',
  gender: 'MAN',
  phone: '010-0000-0000',
  birthDate: '1995-03-15',
  email: 'demo@llowa.kr',
  profileImageUri: 'https://picsum.photos/seed/demo-user/200/200',
  introduction:
    '코스프레를 사랑하는 데모 유저입니다. 주로 원피스, 진격의 거인 캐릭터를 코스합니다.',
  socialLink: null,
};

// 회원가입/정보수정으로 변경된 프로필은 세션 동안 유지되도록 sessionStorage에 백업한다.
// (mockMyProfile 자체는 모듈 메모리라 새로고침 시 초기화되므로, 로그인 유지 여부와
// 프로필 데이터가 서로 어긋나지 않게 하기 위함)
const MY_PROFILE_STORAGE_KEY = 'demo-my-profile';

function loadPersistedMyProfile(): UserProfileDTO {
  if (typeof window === 'undefined') return { ...DEFAULT_MY_PROFILE };

  try {
    const raw = sessionStorage.getItem(MY_PROFILE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_MY_PROFILE };
    return { ...DEFAULT_MY_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_MY_PROFILE };
  }
}

export const mockMyProfile: UserProfileDTO = loadPersistedMyProfile();

export function updateDemoMyProfile(
  fields: Partial<Omit<UserProfileDTO, 'uuid'>>
): void {
  Object.assign(mockMyProfile, fields);

  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(
      MY_PROFILE_STORAGE_KEY,
      JSON.stringify(mockMyProfile)
    );
  } catch {
    // sessionStorage 접근 실패 시 메모리 상태만 유지
  }
}

// 회원 탈퇴 시 호출: 세션에 백업된 프로필을 지우고 메모리 상태도 기본값으로 되돌린다.
export function resetDemoMyProfile(): void {
  Object.assign(mockMyProfile, DEFAULT_MY_PROFILE);

  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(MY_PROFILE_STORAGE_KEY);
  } catch {
    // sessionStorage 접근 실패 시 무시
  }
}
