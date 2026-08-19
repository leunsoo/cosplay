'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import { useLogined } from '@/entities/auth';
import { USER_QUERIES } from '@/shared/api/endpoints/user';

// 로그인 여부와 무관하게 호출 가능. 로그인 상태가 아니면 요청을 보내지 않고
// data는 undefined로 유지된다.
export function useMyProfile() {
  const isLogined = useLogined();
  const userUuid = useAuthStore((state) => state.userUuid);

  return useQuery({
    ...USER_QUERIES.myProfile(userUuid),
    enabled: isLogined && !!userUuid,
    staleTime: Infinity,
  });
}
