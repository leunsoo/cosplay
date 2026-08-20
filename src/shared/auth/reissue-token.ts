import type { ApiResponse } from '@/shared/api';
import { authApiClient } from '@/shared/api/auth-api-client';

interface ReissueResponse {
  accessToken: string;
}

export async function reissueToken(): Promise<ApiResponse<ReissueResponse>> {
  return authApiClient.post<ReissueResponse>('/api/v1/auth/reissue');
}
