import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockBanners } from '@/mocks';
import { BannersDTOSchema, type BannersDTO } from './banner';

export const getBannerListServer = async (): Promise<
  ApiResponse<BannersDTO>
> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockBanners };
  return serverFetch('/api/v1/banners', BannersDTOSchema, {
    revalidate: 300,
    tags: ['banners'],
  });
};
