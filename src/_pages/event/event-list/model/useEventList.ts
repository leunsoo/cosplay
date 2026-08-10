import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { mapEventDtoToEvent } from '@/entities/event';
import { EVENT_QUERIES, type EventStatusParam } from '@/shared/api/event';
import { getMeetupList, type MeetupStatus } from '../api/meetupApi';
import { mapMeetupDtoToEvent } from './mappers';

const CATEGORY_TO_EVENT_STATUS: Record<string, EventStatusParam> = {
  전체: 'ALL',
  예정: 'UPCOMING',
  진행중: 'ONGOING',
  종료됨: 'CLOSED',
};

const CATEGORY_TO_MEETUP_STATUS: Record<string, MeetupStatus> = {
  전체: 'ALL',
  진행중: 'ONGOING',
  종료됨: 'CLOSED',
};

export function useEventList() {
  const [selectedSource, setSelectedSource] = useState<'공식' | '개인'>('공식');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const eventStatus = CATEGORY_TO_EVENT_STATUS[selectedCategory] ?? 'ALL';
  const meetupStatus = CATEGORY_TO_MEETUP_STATUS[selectedCategory] ?? 'ALL';

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
    queryKey: ['meetups', meetupStatus],
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
    selectedCategory,
    setSelectedCategory,
  };
}
