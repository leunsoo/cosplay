// 빌드 시 정적 생성 시도 안 하고 요청마다 서버에서 실행
export const dynamic = 'force-dynamic';

import { type Metadata } from 'next';
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { getProductListServer } from '@/entities/product';
import { ProductListView } from '@/views/product-list';

/**
 * 코스마켓 목록 페이지 메타데이터
 * layout.tsx의 title.template에 의해 "코스마켓 | LLOWA" 로 완성됨
 */
export const metadata: Metadata = {
  title: '코스마켓',
  description:
    '코스프레 의상, 소품, 가발 등을 사고 팔 수 있는 코스프레 중고 거래 마켓입니다.',
  openGraph: {
    title: '코스마켓 | LLOWA',
    description:
      '코스프레 의상, 소품, 가발 등을 사고 팔 수 있는 코스프레 중고 거래 마켓입니다.',
    url: 'https://llowa.kr/market',
  },
  alternates: {
    canonical: 'https://llowa.kr/market',
  },
};

/**
 * [서버 컴포넌트]
 *
 * Hydration 패턴 적용:
 *   1. 서버에서 1페이지 상품 목록을 prefetchQuery로 미리 fetch
 *   2. dehydrate → HydrationBoundary로 클라이언트 캐시에 주입
 *   3. 클라이언트의 useQuery(['products', 1])이 캐시에서 즉시 데이터를 가져옴
 *      → 구글 봇에게 완성된 상품 목록 HTML 전달 → SEO 가능
 *
 * Suspense를 유지하는 이유:
 *   ProductListView 내부에서 useSearchParams()를 사용하므로 Suspense가 필요
 *   (Next.js에서 useSearchParams는 반드시 Suspense로 감싸야 함)
 *
 * revalidate: 300 → 5분마다 백그라운드에서 상품 목록 캐시 갱신
 */
export default async function MarketPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', 1], // ProductListView의 초기 페이지(1)와 동일한 queryKey
    queryFn: () => getProductListServer({ page: 1 }, { cache: 'no-store' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <ProductListView />
      </Suspense>
    </HydrationBoundary>
  );
}
