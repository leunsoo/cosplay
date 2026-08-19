import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoMyProfile } from '@/mocks';
import type { Gender } from './gender';

export interface RegisterUserResponse {
  accessToken: string;
}

// register의 회원가입 요청 바디 형태 (registerUser가 실제로 기대하는 형태)
export interface RegisterUserBody {
  nickname: string;
  name: string;
  gender: Gender;
  phone: string;
  birthDate: string;
  email: string;
  profileImageUri?: string | null;
  introduction?: string | null;
}

export const registerUser = async (
  body: RegisterUserBody
): Promise<ApiResponse<RegisterUserResponse>> => {
  if (IS_DEMO) {
    updateDemoMyProfile({
      nickname: body.nickname,
      name: body.name,
      gender: body.gender,
      phone: body.phone,
      birthDate: body.birthDate,
      email: body.email,
      profileImageUri: body.profileImageUri ?? null,
      introduction: body.introduction ?? null,
    });
    return {
      status: 'SUCCESS',
      message: '성공',
      data: { accessToken: 'demo-token' },
    };
  }

  return apiClient.post('/api/v1/auth/register', body);
};
