import { type EventDetailDTO } from '@/views/event-detail/model';

interface EventJsonLdProps {
  event: EventDetailDTO;
  eventId: string;
}

/**
 * 행사 상세 페이지 JSON-LD 구조화 데이터 컴포넌트
 *
 * JSON-LD는 <body> 안에 위치하는 <script> 태그입니다.
 * generateMetadata(<head>)와 달리 JSX로 렌더링합니다.
 *
 * 구글이 이 데이터를 인식하면 검색 결과에 날짜/장소 리치 스니펫이 표시됩니다.
 */
export function EventJsonLd({ event, eventId }: EventJsonLdProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description ?? event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    image: event.thumbnailUrl,
    url: `${BASE_URL}/event/${eventId}`,
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: {
      '@type': 'Organization',
      name: '로와',
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
