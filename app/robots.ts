import { MetadataRoute } from 'next';

/**
 * 검색 엔진 크롤러에게 수집 허용/금지 페이지를 알려주는 robots.txt
 * - allow: 크롤러가 수집해도 되는 경로 (검색 노출 원하는 페이지)
 * - disallow: 크롤러가 수집하면 안 되는 경로 (로그인 필요 페이지, 관리 페이지 등)
 * - sitemap: 사이트맵 위치를 크롤러에게 알림
 *
 * 접근 경로: /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

  return {
    rules: {
      userAgent: '*', // 모든 크롤러에 적용
      allow: '/',
      disallow: [
        '/(user)/login',
        '/(user)/register',
        '/(user)/my-info',
        '/auth/',
        '/market/chat',
        '/market/products/regist',
        '/market/products/*/edit',
        '/meetup/register',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
