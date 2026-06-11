import { apiClient, type ApiResponse } from '@/shared/api';
import { LogoutResponseSchema, type LogoutResponse } from '../model/schema';
import { IS_DEMO } from '@/shared/lib/isDemo';

export const logout = async (): Promise<ApiResponse<LogoutResponse>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: null };

  return apiClient.deleteWithValidation(
    '/api/v1/auth/logout',
    LogoutResponseSchema
  );
};
