import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';

// 로그아웃 API

export const LogoutResponseSchema = z.null().or(z.undefined());
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

export const logout = async (): Promise<ApiResponse<LogoutResponse>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: null };

  return apiClient.deleteWithValidation(
    '/api/v1/auth/logout',
    LogoutResponseSchema
  );
};

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
