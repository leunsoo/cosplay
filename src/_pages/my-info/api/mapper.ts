import type { UserProfileDTO } from '@/shared/api/user';
import type { UserProfileFormValues } from '@/features/user-profile-form';
import type { UpdateMyProfileBody } from './use-update-my-profile';

export function mapMyProfileDTOToUserProfileFormModel(
  dto: UserProfileDTO
): UserProfileFormValues {
  return {
    nickname: dto.nickname ?? '',
    name: dto.name ?? '',
    gender: dto.gender ?? 'WOMAN',
    phone: dto.phone ?? '',
    birthDate: dto.birthDate ?? '',
    email: dto.email ?? '',
    profileImageUri: dto.profileImageUri ?? '',
    introduction: dto.introduction ?? '',
    removeProfileImage: false,
  };
}

export function mapUserProfileFormModelToUpdateBody(
  model: UserProfileFormValues,
  uuid: string
): UpdateMyProfileBody {
  return {
    ...model,
    uuid,
    socialLink: null,
  };
}
