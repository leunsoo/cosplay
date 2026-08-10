import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMyProfile } from '@/mocks';
import { GenderSchema } from './gender';

export const UserProfileDTOSchema = z.object({
  uuid: z.string().min(1).nullable().optional(),
  nickname: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  gender: GenderSchema.nullable().optional(),
  phone: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  profileImageUri: z.string().nullable().optional(),
  introduction: z.string().nullable().optional(),
  socialLink: z.string().nullable().optional(),
});

export type UserProfileDTO = z.infer<typeof UserProfileDTOSchema>;

interface GetMyProfileParams {
  uuid: string;
}

export const getMyProfile = async (
  params: GetMyProfileParams
): Promise<ApiResponse<UserProfileDTO>> => {
  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockMyProfile };

  return apiClient.getWithValidation(
    `/api/v1/user/${params.uuid}`,
    UserProfileDTOSchema
  );
};
