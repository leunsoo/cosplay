import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinMeetup, MEETUP_QUERIES } from '@/shared/api/endpoints/meetup';

export function useJoinMeetup(meetupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MEETUP_QUERIES.members(meetupId).queryKey,
      });
    },
  });
}
