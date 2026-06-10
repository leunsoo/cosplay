import { apiClient, type ApiResponse } from '@/shared/api';
import { LogoutResponseSchema, type LogoutResponse } from '../model/schema';

export const logout = async (): Promise<ApiResponse<LogoutResponse>> => {
  return apiClient.deleteWithValidation(
    '/api/v1/auth/logout',
    LogoutResponseSchema
  );
};
