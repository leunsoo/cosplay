// 동적 라우트([eventId])는 빌드 시 모든 경우의 수를 알 수 없으므로 force-dynamic
export const dynamic = 'force-dynamic';

import { type Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { getEventDetailServer } from '@/views/event-detail/api';
import { EventDetailView } from '@/views/event-detail';
import { EventJsonLd } from './_components/EventJsonLd';

interface EventDetailPageProps {
  params: Promise<{ eventId: string }>;
}

/**
 * 행사 데이터를 서버에서 fetch하는 공통 함수
 *
 * generateMetadata와 페이지 컴포넌트에서 동일한 URL로 fetch하면
 * Next.js가 자동으로 중복 제거(dedup)합니다. (실제 API 호출은 1번)
 */
async function fetchEventDetail(eventId: string) {
  const response = await getEventDetailServer({ eventId: Number(eventId) });
  return response.data;
}

/**
 * 행사 상세 페이지 동적 메타데이터
 *
 * generateMetadata는 서버에서 실행되며, 각 행사의 실제 데이터로
 * 페이지별 고유한 title/description/OG 태그를 생성합니다.
 *
 * 예시:
 *   /event/1 → title: "코믹월드 2024 - LLOWA"
 *   /event/2 → title: "코스페스타 서울 - LLOWA"
 */
export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { eventId } = await params;

  try {
    const event = await fetchEventDetail(eventId);

    return {
      title: event.title,
      description:
        event.description ??
        `${event.title} 행사 정보를 확인하세요. 일시: ${event.startDate} ~ ${event.endDate}, 장소: ${event.location}`,
      openGraph: {
        title: `${event.title} - LLOWA`,
        description:
          event.description ??
          `${event.title} - ${event.location} (${event.startDate} ~ ${event.endDate})`,
        images: [{ url: event.thumbnailUrl, alt: event.title }],
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`,
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/event/${eventId}`,
      },
    };
  } catch {
    return {
      title: '행사 상세',
      description: '코스프레 행사 상세 정보를 확인하세요.',
    };
  }
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { eventId } = await params;
  const queryClient = getQueryClient();

  let event = null;
  try {
    event = await fetchEventDetail(eventId);

    // prefetchQuery: EventDetailView의 useQuery(['event', eventId])와 동일한 queryKey
    // → 클라이언트에서 API 재호출 없이 캐시에서 즉시 데이터를 가져옴 → SEO 가능
    await queryClient.prefetchQuery({
      queryKey: ['event', eventId],
      queryFn: async () => ({ data: await fetchEventDetail(eventId) }),
    });
  } catch {
    // JSON-LD/prefetch 실패 시 무시 (EventDetailView는 자체적으로 에러 처리)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {event && <EventJsonLd event={event} eventId={eventId} />}
      <EventDetailView eventId={eventId} />
    </HydrationBoundary>
  );
}
