'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoMyProfile } from '@/mocks';
import { USER_QUERIES, type Gender } from '@/shared/api/user';
import {
  useAuthStore,
  DEMO_REGISTERED_KEY,
  consumeLoginRedirectPath,
} from '@/shared/auth';
import type { UserProfileFormValues } from '@/features/user-profile-form';

interface RegisterUserResponse {
  accessToken: string;
}

interface RegisterUserVariables {
  formValues: UserProfileFormValues;
  uploadProfileImage: () => Promise<string>;
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

const registerUser = async (
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

export function useRegisterUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setDemoAuthenticated = useAuthStore(
    (state) => state.setDemoAuthenticated
  );

  return useMutation({
    mutationFn: async ({
      formValues,
      uploadProfileImage,
    }: RegisterUserVariables) => {
      const profileImageUri = await uploadProfileImage();

      return registerUser({ ...formValues, profileImageUri });
    },
    onSuccess: (response) => {
      if (IS_DEMO) {
        sessionStorage.setItem(DEMO_REGISTERED_KEY, 'true');
        setDemoAuthenticated();
      } else {
        setAuthenticated(response.data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: USER_QUERIES.myProfiles() });
      alert('회원가입이 완료되었습니다.');
      const next = consumeLoginRedirectPath();
      router.push(next || ROUTES.HOME);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
}
