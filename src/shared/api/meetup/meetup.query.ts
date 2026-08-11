import { queryOptions } from '@tanstack/react-query';
import { getMeetupList, type MeetupStatus } from './get-meetup-list';
import { getMeetupDetail } from './get-meetup-detail';
import { getMeetupMembers } from './get-meetup-members';

export const MEETUP_QUERIES = {
  all: () => ['meetups'] as const,
  lists: () => [...MEETUP_QUERIES.all(), 'list'] as const,
  list: (status: MeetupStatus) =>
    queryOptions({
      queryKey: [...MEETUP_QUERIES.lists(), status] as const,
      queryFn: () => getMeetupList(status),
    }),
  details: () => [...MEETUP_QUERIES.all(), 'detail'] as const,
  detail: (meetupId: number) =>
    queryOptions({
      queryKey: [...MEETUP_QUERIES.details(), meetupId] as const,
      queryFn: () => getMeetupDetail(meetupId),
    }),
  members: (meetupId: number) =>
    queryOptions({
      queryKey: [...MEETUP_QUERIES.all(), 'members', meetupId] as const,
      queryFn: () => getMeetupMembers(meetupId),
    }),
};
