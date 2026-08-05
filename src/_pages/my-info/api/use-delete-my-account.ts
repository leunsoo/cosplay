'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { deleteMyAccount } from '@/shared/api/user';
import { useAuthStore } from '@/shared/auth';

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
