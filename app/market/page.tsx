// 빌드 시 정적 생성 시도 안 하고 요청마다 서버에서 실행
export const dynamic = 'force-dynamic';

import { type Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { getProductListServer } from '@/entities/product';
import { ProductListView } from '@/views/product-list';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

/**
 * 코스마켓 목록 페이지 메타데이터
 *
 * layout.tsx의 title.template에 의해 "코스프레 중고거래 마켓 - LLOWA" 로 완성됨
 */
export const metadata: Metadata = {
  title: '코스프레 중고거래 마켓',
  description:
    '코스프레 의상, 소품, 가발 등을 사고 팔 수 있는 코스프레 중고 거래 마켓입니다.',
  openGraph: {
    title: '코스프레 중고거래 마켓 - LLOWA',
    description:
      '코스프레 의상, 소품, 가발 등을 사고 팔 수 있는 코스프레 중고 거래 마켓입니다.',
    url: `${BASE_URL}/market`,
  },
  alternates: {
    canonical: `${BASE_URL}/market`,
  },
};

interface MarketPageProps {
  searchParams: Promise<{ keyword?: string }>;
}

/**
 * [서버 컴포넌트]
 *
 * Hydration 패턴 적용:
 *   1. 서버에서 1페이지 상품 목록을 prefetchQuery로 미리 fetch
 *   2. dehydrate → HydrationBoundary로 클라이언트 캐시에 주입
 *   3. 클라이언트의 useQuery(['products', 1])이 캐시에서 즉시 데이터를 가져옴
 *      → 구글 봇에게 완성된 상품 목록 HTML 전달 → SEO 가능
 *
 * keyword를 useSearchParams() 대신 searchParams prop으로 받는 이유:
 *   useSearchParams()(클라이언트 훅)를 쓰면 Suspense 경계가 필요해지는데,
 *   Suspense의 fallback→실제 콘텐츠 스트리밍 교체는 JS로 실행되는 스크립트에
 *   의존한다. JS 없이 접속하면(크롤러 등) fallback(null)에서 멈춰 HTML에
 *   데이터가 도달해도 화면엔 보이지 않는다. 이미 force-dynamic이라 정적 생성
 *   최적화 대상도 아니므로, 서버 컴포넌트가 받는 searchParams를 그대로 prop으로
 *   내려 Suspense 자체를 제거한다.
 *
 * revalidate: 300 → 5분마다 백그라운드에서 상품 목록 캐시 갱신
 */
export default async function MarketPage({ searchParams }: MarketPageProps) {
  const { keyword = '' } = await searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', 1], // ProductListView의 초기 페이지(1)와 동일한 queryKey
    queryFn: () => getProductListServer({ page: 1 }, { cache: 'no-store' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView keyword={keyword} />
    </HydrationBoundary>
  );
}
