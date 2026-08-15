'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockBanners } from '@/mocks';
import { BANNER_QUERIES } from './banner.query';

// 배너 목록 조회 API

const BannerDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  displayOrder: z.number().int().nonnegative(),
  imageUrl: z.string(),
  linkUrl: z.string(),
  title: z.string(),
  description: z.string(),
  eventId: z.number().int().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BannersDTOSchema = z.array(BannerDTOSchema);

export type BannerDTO = z.infer<typeof BannerDTOSchema>;
export type BannersDTO = z.infer<typeof BannersDTOSchema>;

export const getBannerList = async (): Promise<ApiResponse<BannersDTO>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockBanners };
  return apiClient.getWithValidation('/api/v1/banners', BannersDTOSchema);
};

export function useBannerList() {
  return useQuery({
    queryKey: BANNER_QUERIES.list(),
    queryFn: getBannerList,
  });
}
