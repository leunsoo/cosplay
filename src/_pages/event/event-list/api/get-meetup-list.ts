'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  MEETUP_QUERIES,
  getMeetupList,
  type MeetupStatus,
} from '@/shared/api/endpoints/meetup';

export type { MeetupStatus };

export function useMeetupList(status: MeetupStatus, enabled: boolean) {
  return useQuery({
    // MEETUP_QUERIES.all()과 같은 접두사를 써서, meetup-regist/meetup-detail의
    // 전체 무효화(MEETUP_QUERIES.all())가 이 목록 캐시도 함께 무효화하도록 한다.
    queryKey: [...MEETUP_QUERIES.all(), 'list', status],
    queryFn: () => getMeetupList(status),
    enabled,
    staleTime: 3 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
