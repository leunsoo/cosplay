import { z } from 'zod';
import { GenderSchema } from '@/shared/api/endpoints/user';

export const GENDER_OPTIONS = GenderSchema.options;

export const UserProfileFormValuesSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: GenderSchema,
  phone: z.string().min(1, '휴대폰 번호를 입력해주세요'),
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  profileImageUri: z.string(),
  introduction: z.string(),
  removeProfileImage: z.boolean(),
});

export type UserProfileFormValues = z.infer<typeof UserProfileFormValuesSchema>;

// 폼을 처음 채우거나 데이터가 아직 없을 때 쓰는 공통 빈 값
export const EMPTY_USER_PROFILE_FORM_VALUES: UserProfileFormValues = {
  nickname: '',
  name: '',
  gender: 'MAN',
  phone: '',
  birthDate: '',
  email: '',
  profileImageUri: '',
  introduction: '',
  removeProfileImage: false,
};
