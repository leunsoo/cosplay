import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveMeetup, MEETUP_QUERIES } from '@/shared/api/endpoints/meetup';

export function useLeaveMeetup(meetupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MEETUP_QUERIES.members(meetupId).queryKey,
      });
    },
  });
}
