import { apiClient, type ApiResponse } from '@/shared/api';
import { BannersDTOSchema, type BannersDTO } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockBanners } from '@/mocks/banner';

/**
 * 배너 목록 조회 API
 *
 * @returns 배너 목록
 *
 * @example
 * ```ts
 * const response = await getBanners();
 * ```
 *
 * @throws {ZodError} 백엔드 응답이 예상과 다를 경우
 */
export const getBannerList = async (): Promise<ApiResponse<BannersDTO>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockBanners };
  return apiClient.getWithValidation('/api/v1/banners', BannersDTOSchema);
};
