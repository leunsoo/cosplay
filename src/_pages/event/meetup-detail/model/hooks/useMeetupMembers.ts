import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import {
  getMeetupMembers,
  joinMeetup,
  leaveMeetup,
} from '../../api/meetupDetailApi';

export function useMeetupMembers(meetupId: number, enabled = true) {
  const currentUuid = useAuthStore((state) => state.userUuid);
  const queryClient = useQueryClient();

  const isValidId = Number.isFinite(meetupId) && meetupId > 0;

  const { data: membersData } = useQuery({
    queryKey: ['meetup-members', meetupId],
    queryFn: () => getMeetupMembers(meetupId),
    enabled: enabled && isValidId,
    refetchInterval: enabled && isValidId ? 0 : false,
  });

  const members = membersData?.data ?? [];
  const isJoined = members.some((m) => m.user.uuid === currentUuid);

  const { mutate: handleJoin, isPending: isJoining } = useMutation({
    mutationFn: () => joinMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetup-members', meetupId] });
    },
  });

  const { mutate: handleLeave, isPending: isLeaving } = useMutation({
    mutationFn: () => leaveMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetup-members', meetupId] });
    },
  });

  return { members, isJoined, handleJoin, handleLeave, isJoining, isLeaving };
}
