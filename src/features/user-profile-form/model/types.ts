export const GENDER_OPTIONS = ['woman', 'man'] as const;

export type Gender = (typeof GENDER_OPTIONS)[number];

export interface UserProfileFormValues {
  nickname: string;
  name: string;
  gender: Gender;
  phone: string;
  birthDate: string;
  email: string;
  profileImageUrl: string;
  introduction: string;
  removeProfileImage: boolean;
}
