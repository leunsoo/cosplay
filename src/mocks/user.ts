import type { MyProfileDTO } from '@/entities/user/model/schema/getMyProfile';

export const DEMO_USER_UUID = 'demo-user-uuid-0000';

export const mockMyProfile: MyProfileDTO = {
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

export function updateDemoMyProfile(
  fields: Partial<Omit<MyProfileDTO, 'uuid'>>
): void {
  Object.assign(mockMyProfile, fields);
}
