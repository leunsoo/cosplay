import { queryOptions } from '@tanstack/react-query';
import { getMeetupDetail } from './get-meetup-detail';
import { getMeetupMembers } from './get-meetup-members';

export const MEETUP_QUERIES = {
  all: () => ['meetups'] as const,
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
