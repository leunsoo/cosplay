'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { resetDemoMyProfile } from '@/mocks';
import { useAuthStore, DEMO_REGISTERED_KEY } from '@/shared/auth';

interface DeleteMyAccountBody {
  uuid: string;
}

const deleteMyAccount = async (
  body: DeleteMyAccountBody
): Promise<ApiResponse<unknown>> => {
  if (IS_DEMO) {
    resetDemoMyProfile();
    // 탈퇴하면 회원가입 완료 여부도 함께 초기화해, 다음 로그인이
    // 곧바로 재로그인되지 않고 다시 회원가입 절차부터 시작하도록 한다.
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(DEMO_REGISTERED_KEY);
    }
    return { status: 'SUCCESS', message: '성공', data: null };
  }

  return apiClient.post('/api/v1/auth/unregister', body);
};

export function useDeleteMyAccount(userUuid: string) {
  const router = useRouter();
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);

  return useMutation({
    mutationFn: () => deleteMyAccount({ uuid: userUuid }),
    onSuccess: () => {
      setUnauthenticated();
      alert('회원 탈퇴가 완료되었습니다.');
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
}
