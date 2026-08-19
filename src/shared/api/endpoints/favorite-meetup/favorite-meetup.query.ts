import { queryOptions } from '@tanstack/react-query';
import { getFavoriteMeetupList } from './get-favorite-meetup-list';

export const FAVORITE_MEETUP_QUERIES = {
  all: () => ['favorite-meetup'] as const,
  list: (uuid: string) =>
    queryOptions({
      queryKey: [...FAVORITE_MEETUP_QUERIES.all(), uuid] as const,
      queryFn: () => getFavoriteMeetupList({ uuid }),
      enabled: !!uuid,
    }),
  status: (uuid: string, meetupId: number) =>
    ['favorite-meetup-status', uuid, meetupId] as const,
};
