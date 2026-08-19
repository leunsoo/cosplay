import { useQuery } from '@tanstack/react-query';
import { MEETUP_QUERIES } from '@/shared/api/endpoints/meetup';

export function useMeetupMembers(meetupId: number, enabled = true) {
  const isValidId = Number.isFinite(meetupId) && meetupId > 0;

  const { data: membersData } = useQuery({
    ...MEETUP_QUERIES.members(meetupId),
    enabled: enabled && isValidId,
    refetchInterval: enabled && isValidId ? 0 : false,
  });

  const members = membersData?.data ?? [];

  return { members };
}
