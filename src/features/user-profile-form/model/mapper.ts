import type { UserProfileDTO } from '@/shared/api/user';
import type { RegisterUserBody } from '@/shared/api/user';
import type { UpdateMyProfileBody } from '@/shared/api/user';
import type { UserProfileFormValues } from './user-profile-form';

export const mapMyProfileDTOToUserProfileFormModel = (
  dto: UserProfileDTO
): UserProfileFormValues => ({
  nickname: dto.nickname ?? '',
  name: dto.name ?? '',
  gender: dto.gender ?? 'WOMAN',
  phone: dto.phone ?? '',
  birthDate: dto.birthDate ?? '',
  email: dto.email ?? '',
  profileImageUri: dto.profileImageUri ?? '',
  introduction: dto.introduction ?? '',
  removeProfileImage: false,
});

export const mapUserProfileFormModelToRegisterBody = (
  model: UserProfileFormValues
): RegisterUserBody => ({
  ...model,
});

export const mapUserProfileFormModelToUpdateBody = (
  model: UserProfileFormValues,
  uuid: string
): UpdateMyProfileBody => ({
  ...model,
  uuid,
  socialLink: null,
});
