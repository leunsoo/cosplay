// 빌드 시 정적 생성 시도 안 하고 요청마다 서버에서 실행
// (빌드 환경에서 백엔드 API 호출 불가로 인한 타임아웃 방지)
export const dynamic = 'force-dynamic';

import { type Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { serverFetch } from '@/shared/api';
import { EventListDTOSchema } from '@/entities/event/model';
import { BannersDTOSchema } from '@/entities/banner/model';
import { EventListView } from '@/views/event-list';

/**
 * 행사 목록 페이지 메타데이터
 * layout.tsx의 title.template에 의해 "코스프레 행사 일정 | LLOWA" 로 완성됨
 */
export const metadata: Metadata = {
  title: '코스프레 행사 일정',
  description:
    '국내 공식 및 개인 코스프레 행사 일정을 한눈에 확인하세요. 예정, 진행중, 종료된 행사까지 모두 제공합니다.',
  openGraph: {
    title: '코스프레 행사 일정 | LLOWA',
    description: '국내 코스프레 공식 및 개인 행사 일정을 한눈에 확인하세요.',
    url: 'https://llowa.kr/event',
  },
  alternates: {
    canonical: 'https://llowa.kr/event',
  },
};

/**
 * [서버 컴포넌트]
 *
 * Hydration 패턴 적용:
 *   1. 서버에서 prefetchQuery로 행사 목록을 미리 fetch
 *   2. dehydrate로 직렬화 → HydrationBoundary를 통해 클라이언트 캐시에 주입
 *   3. 클라이언트의 useQuery(['events'])가 캐시에서 즉시 데이터를 가져옴
 *      → API 재호출 없음, 구글 봇에게 완성된 HTML 전달 → SEO 가능
 *
 * QueryProvider는 layout.tsx에 이미 있으므로 여기서는 HydrationBoundary만 사용
 * revalidate: 300 → 5분마다 백그라운드에서 행사 목록 캐시 갱신
 */
export default async function EventMainPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['events'],
      queryFn: () =>
        serverFetch('/api/v1/events', EventListDTOSchema, {
          revalidate: 300,
          tags: ['events'],
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['banners'],
      queryFn: () =>
        serverFetch('/api/v1/banners', BannersDTOSchema, {
          revalidate: 300,
          tags: ['banners'],
        }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventListView />
    </HydrationBoundary>
  );
}
