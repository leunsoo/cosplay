import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { EVENT_QUERIES } from '@/shared/api/event';
import { MEETUP_QUERIES } from '@/shared/api/meetup';
import { getMeetupList } from '../api/get-meetup-list';
import { mapEventDtoToEvent, mapMeetupDtoToEvent } from '../api/mapper';
import {
  type EventSourceTab,
  STATUS_LABEL_TO_EVENT_STATUS,
  STATUS_LABEL_TO_MEETUP_STATUS,
} from './event-filter-options';

export function useEventList() {
  const [selectedSource, setSelectedSource] = useState<EventSourceTab>('공식');
  const [selectedStatus, setSelectedStatus] = useState<string>('전체');

  const eventStatus = STATUS_LABEL_TO_EVENT_STATUS[selectedStatus] ?? 'ALL';
  const meetupStatus = STATUS_LABEL_TO_MEETUP_STATUS[selectedStatus] ?? 'ALL';

  const {
    data: eventsData,
    isFetching: isEventsFetching,
    error: eventsError,
  } = useQuery({
    ...EVENT_QUERIES.list(eventStatus),
    enabled: selectedSource === '공식',
    staleTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const {
    data: meetupsData,
    isFetching: isMeetupsFetching,
    error: meetupsError,
  } = useQuery({
    // MEETUP_QUERIES.all()과 같은 접두사를 써서, meetup-regist/meetup-detail의
    // 전체 무효화(MEETUP_QUERIES.all())가 이 목록 캐시도 함께 무효화하도록 한다.
    queryKey: [...MEETUP_QUERIES.all(), 'list', meetupStatus],
    queryFn: () => getMeetupList(meetupStatus),
    enabled: selectedSource === '개인',
    staleTime: 3 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const events = (() => {
    if (selectedSource === '공식') {
      return eventsData?.data ? eventsData.data.map(mapEventDtoToEvent) : [];
    }
    return meetupsData?.data ? meetupsData.data.map(mapMeetupDtoToEvent) : [];
  })();

  // 데이터가 전혀 없을 때만 로딩으로 처리 (keepPreviousData로 이전 데이터가 있으면 false)
  const isLoading =
    selectedSource === '공식'
      ? isEventsFetching && !eventsData
      : isMeetupsFetching && !meetupsData;
  const error = selectedSource === '공식' ? eventsError : meetupsError;

  return {
    isLoading,
    error: error ? '행사 목록을 불러오는데 실패했습니다.' : null,
    events,
    selectedSource,
    setSelectedSource,
    selectedStatus,
    setSelectedStatus,
  };
}
