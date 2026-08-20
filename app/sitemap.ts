export const dynamic = 'force-dynamic';

import { MetadataRoute } from 'next';
import { getEventsListServer } from '@/shared/api/endpoints/event/index.server';
import { getProductListServer } from '@/shared/api/endpoints/product/index.server';

/**
 * 검색 엔진 크롤러에게 사이트의 모든 페이지 목록을 제공하는 sitemap.xml 생성
 * - url: 페이지 주소
 * - lastModified: 마지막 수정일 (크롤러가 재수집 여부 판단에 사용)
 * - changeFrequency: 페이지 변경 주기 (크롤러 재방문 빈도 힌트)
 * - priority: 사이트 내 상대적 중요도 (0 ~ 1, 기본값 0.5)
 *
 * 접근 경로: /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

  // 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/event`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/market`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 행사 동적 페이지
  // 행사 목록 전체를 가져와서 각 행사 상세 페이지 URL 생성
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await getEventsListServer('ALL', {
      revalidate: 3600, // 1시간 캐싱 (sitemap은 자주 갱신될 필요 없음)
    });
    eventRoutes = response.data.map((event) => ({
      url: `${BASE_URL}/event/${event.eventId}`,
      lastModified: new Date(event.startDate),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // API 실패 시 동적 행사 페이지 없이 정적 페이지만 포함
  }

  // 상품 동적 페이지
  // 상품 API는 페이지네이션 구조이므로 1페이지 상품만 포함
  // TODO: 전체 상품을 sitemap에 포함하려면 totalPages만큼 반복 호출 필요
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await getProductListServer(
      { page: 1 },
      { revalidate: 3600 }
    );
    productRoutes = response.data.products.map((product) => ({
      url: `${BASE_URL}/market/products/${product.id}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // API 실패 시 동적 상품 페이지 없이 정적 페이지만 포함
  }

  return [...staticRoutes, ...eventRoutes, ...productRoutes];
}
