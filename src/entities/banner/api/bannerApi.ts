import { apiClient, serverFetch, type ApiResponse } from '@/shared/api';
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

// 서버 컴포넌트 / prefetchQuery 전용: apiClient(axios)는 내부적으로
// Zustand(useAuthStore)를 참조해 서버 컴포넌트에서 사용할 수 없음
export const getBannerListServer = async (): Promise<
  ApiResponse<BannersDTO>
> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockBanners };
  return serverFetch('/api/v1/banners', BannersDTOSchema, {
    revalidate: 300,
    tags: ['banners'],
  });
};
