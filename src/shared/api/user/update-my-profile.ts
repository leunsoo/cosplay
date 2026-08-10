import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoMyProfile } from '@/mocks';
import type { Gender } from './gender';

export interface UpdateMyProfileBody {
  uuid: string;
  nickname: string;
  name?: string | null;
  gender?: Gender | null;
  phone?: string | null;
  birthDate?: string | null;
  email?: string | null;
  profileImageUri: string | null;
  introduction: string | null;
  socialLink: string | null;
  removeProfileImage: boolean;
}

interface UpdateMyProfileParams {
  body: UpdateMyProfileBody;
}

export const updateMyProfile = async ({
  body,
}: UpdateMyProfileParams): Promise<ApiResponse<unknown>> => {
  if (IS_DEMO) {
    updateDemoMyProfile({
      nickname: body.nickname,
      name: body.name,
      gender: body.gender,
      phone: body.phone,
      birthDate: body.birthDate,
      email: body.email,
      profileImageUri: body.removeProfileImage ? null : body.profileImageUri,
      introduction: body.introduction,
      socialLink: body.socialLink,
    });
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.patch('/api/v1/user', body);
};
