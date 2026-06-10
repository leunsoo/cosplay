import type {
  MyProfileDTO,
  RegisterUserBody,
  UpdateMyProfileBody,
} from './schema';

export type UserProfileFormGender = 'woman' | 'man';

export interface UserProfileFormModel {
  nickname: string;
  name: string;
  gender: UserProfileFormGender;
  phone: string;
  birthDate: string;
  email: string;
  profileImageUrl: string;
  introduction: string;
  removeProfileImage: boolean;
}

const profileGenderToFormGenderMap: Record<string, UserProfileFormGender> = {
  WOMAN: 'woman',
  MAN: 'man',
};

const formGenderToProfileGenderMap: Record<
  UserProfileFormGender,
  'WOMAN' | 'MAN'
> = {
  woman: 'WOMAN',
  man: 'MAN',
};

export const mapMyProfileDTOToUserProfileFormModel = (
  dto: MyProfileDTO
): UserProfileFormModel => ({
  nickname: dto.nickname ?? '',
  name: dto.name ?? '',
  gender:
    profileGenderToFormGenderMap[String(dto.gender ?? '').toUpperCase()] ??
    'woman',
  phone: dto.phone ?? '',
  birthDate: dto.birthDate ?? '',
  email: dto.email ?? '',
  profileImageUrl: dto.profileImageUri ?? '',
  introduction: dto.introduction ?? '',
  removeProfileImage: false,
});

export const mapUserProfileFormModelToRegisterBody = (
  model: UserProfileFormModel
): RegisterUserBody => ({
  nickname: model.nickname,
  name: model.name,
  gender: formGenderToProfileGenderMap[model.gender],
  phone: model.phone,
  birthDate: model.birthDate,
  email: model.email,
  profileImageUri: model.profileImageUrl || null,
  introduction: model.introduction || null,
});

export const mapUserProfileFormModelToUpdateBody = (
  model: UserProfileFormModel,
  uuid: string
): UpdateMyProfileBody => ({
  uuid,
  nickname: model.nickname,
  name: model.name || null,
  gender: model.gender ? formGenderToProfileGenderMap[model.gender] : null,
  phone: model.phone || null,
  birthDate: model.birthDate || null,
  email: model.email || null,
  profileImageUri: model.profileImageUrl || null,
  introduction: model.introduction || null,
  socialLink: null,
  removeProfileImage: model.removeProfileImage,
});
