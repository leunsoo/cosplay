'use client';

import { useQuery } from '@tanstack/react-query';
import { USER_QUERIES } from '@/shared/api/endpoints/user';

export function useMyProfile(userUuid: string) {
  return useQuery(USER_QUERIES.myProfile(userUuid));
}
