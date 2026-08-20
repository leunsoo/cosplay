'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { USER_QUERIES, registerUser } from '@/shared/api/endpoints/user';
import {
  useAuthStore,
  DEMO_REGISTERED_KEY,
  consumeLoginRedirectPath,
} from '@/shared/auth';
import type { UserProfileFormValues } from '@/features/user-profile-form';

interface SignupUserVariables {
  formValues: UserProfileFormValues;
  uploadProfileImage: () => Promise<string>;
}

export function useSignupUser() {
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
    }: SignupUserVariables) => {
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
