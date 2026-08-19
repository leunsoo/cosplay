import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockBanners } from '@/mocks';
import {
  BannersDTOSchema,
  type BannerDTO,
  type BannersDTO,
} from './get-banner-list.type';

// 배너 목록 조회 API

export type { BannerDTO, BannersDTO };

export const getBannerList = async (): Promise<ApiResponse<BannersDTO>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockBanners };
  return apiClient.getWithValidation('/api/v1/banners', BannersDTOSchema);
};
