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

  return apiClient.getWithValidation(
    `/api/v1/user/${validatedParams.uuid}`,
    MyProfileDTOSchema
  );
};

export const updateMyProfile = async ({
  body,
}: UpdateMyProfileRequest): Promise<ApiResponse<UpdateMyProfileDTO>> => {
  const validatedBody = UpdateMyProfileBodySchema.parse(body);

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

  return apiClient.postWithValidation(
    '/api/v1/auth/unregister',
    DeleteMyAccountDTOSchema,
    validatedBody
  );
};
