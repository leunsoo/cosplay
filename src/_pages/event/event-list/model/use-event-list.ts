import { useState } from 'react';
import { useEventsList } from '../api/get-events-list';
import { useMeetupList } from '../api/get-meetup-list';
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
  } = useEventsList(eventStatus, selectedSource === '공식');

  const {
    data: meetupsData,
    isFetching: isMeetupsFetching,
    error: meetupsError,
  } = useMeetupList(meetupStatus, selectedSource === '개인');

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
