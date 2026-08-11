import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import { MEETUP_QUERIES, joinMeetup, leaveMeetup } from '@/shared/api/meetup';

export function useMeetupMembers(meetupId: number, enabled = true) {
  const currentUuid = useAuthStore((state) => state.userUuid);
  const queryClient = useQueryClient();

  const isValidId = Number.isFinite(meetupId) && meetupId > 0;

  const { data: membersData } = useQuery({
    ...MEETUP_QUERIES.members(meetupId),
    enabled: enabled && isValidId,
    refetchInterval: enabled && isValidId ? 0 : false,
  });

  const members = membersData?.data ?? [];
  const isJoined = members.some((m) => m.user.uuid === currentUuid);

  const membersQueryKey = MEETUP_QUERIES.members(meetupId).queryKey;

  const { mutate: handleJoin, isPending: isJoining } = useMutation({
    mutationFn: () => joinMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersQueryKey });
    },
  });

  const { mutate: handleLeave, isPending: isLeaving } = useMutation({
    mutationFn: () => leaveMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membersQueryKey });
    },
  });

  return { members, isJoined, handleJoin, handleLeave, isJoining, isLeaving };
}
