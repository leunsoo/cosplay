import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { resetDemoMyProfile } from '@/mocks';
import { DEMO_REGISTERED_KEY } from '@/shared/auth/demoAuthSession';

export interface DeleteMyAccountBody {
  uuid: string;
}

export const deleteMyAccount = async (
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
