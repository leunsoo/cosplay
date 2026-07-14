import { apiClient, type ApiResponse } from '@/shared/api';
import {
  DeleteMyAccountBodySchema,
  DeleteMyAccountDTOSchema,
  GetMyProfileParamsSchema,
  MyProfileDTOSchema,
  ProfileImageUploadUrlBodySchema,
  ProfileImageUploadUrlDTOSchema,
  RegisterUserBodySchema,
  RegisterUserDTOSchema,
  UpdateMyProfileBodySchema,
  UpdateMyProfileDTOSchema,
  type DeleteMyAccountDTO,
  type DeleteMyAccountBody,
  type GetMyProfileParams,
  type MyProfileDTO,
  type ProfileImageUploadUrlBody,
  type ProfileImageUploadUrlDTO,
  type RegisterUserBody,
  type RegisterUserDTO,
  type UpdateMyProfileBody,
  type UpdateMyProfileDTO,
} from '../model/schema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMyProfile, updateDemoMyProfile } from '@/mocks';

interface RegisterUserParams {
  body: RegisterUserBody;
}

interface UpdateMyProfileRequest {
  body: UpdateMyProfileBody;
}

export const registerUser = async ({
  body,
}: RegisterUserParams): Promise<ApiResponse<RegisterUserDTO>> => {
  const validatedBody = RegisterUserBodySchema.parse(body);

  if (IS_DEMO) {
    updateDemoMyProfile({
      nickname: validatedBody.nickname,
      name: validatedBody.name,
      gender: validatedBody.gender,
      phone: validatedBody.phone,
      birthDate: validatedBody.birthDate,
      email: validatedBody.email,
      profileImageUri: validatedBody.profileImageUri ?? null,
      introduction: validatedBody.introduction ?? null,
    });
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { accessToken: 'demo-token' },
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/auth/register',
    RegisterUserDTOSchema,
    validatedBody
  );
};

export const generateProfileImageUploadUrl = async (
  body: ProfileImageUploadUrlBody
): Promise<ApiResponse<ProfileImageUploadUrlDTO>> => {
  const validatedBody = ProfileImageUploadUrlBodySchema.parse(body);

  if (IS_DEMO) {
    // 데모 모드에서는 실제 업로드 대상이 없으므로 호출부에서 URL.createObjectURL로 대체한다.
    // 이 함수 자체는 호출되지 않아야 하지만, 안전하게 빈 값을 반환한다.
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { uploadUrl: '', imageUrl: '' },
    };
  }

  return apiClient.postWithValidation(
    '/api/v1/user/profile-image-upload-url',
    ProfileImageUploadUrlDTOSchema,
    validatedBody
  );
};

export const getMyProfile = async (
  params: GetMyProfileParams
): Promise<ApiResponse<MyProfileDTO>> => {
  const validatedParams = GetMyProfileParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockMyProfile };

  return apiClient.getWithValidation(
    `/api/v1/user/${validatedParams.uuid}`,
    MyProfileDTOSchema
  );
};

export const updateMyProfile = async ({
  body,
}: UpdateMyProfileRequest): Promise<ApiResponse<UpdateMyProfileDTO>> => {
  const validatedBody = UpdateMyProfileBodySchema.parse(body);

  if (IS_DEMO) {
    updateDemoMyProfile({
      nickname: validatedBody.nickname,
      name: validatedBody.name,
      gender: validatedBody.gender,
      phone: validatedBody.phone,
      birthDate: validatedBody.birthDate,
      email: validatedBody.email,
      profileImageUri: validatedBody.removeProfileImage
        ? null
        : validatedBody.profileImageUri,
      introduction: validatedBody.introduction,
      socialLink: validatedBody.socialLink,
    });
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.patchWithValidation(
    '/api/v1/user',
    UpdateMyProfileDTOSchema,
    validatedBody
  );
};

export const deleteMyAccount = async (
  body: DeleteMyAccountBody
): Promise<ApiResponse<DeleteMyAccountDTO>> => {
  const validatedBody = DeleteMyAccountBodySchema.parse(body);

  if (IS_DEMO) {
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.postWithValidation(
    '/api/v1/auth/unregister',
    DeleteMyAccountDTOSchema,
    validatedBody
  );
};
