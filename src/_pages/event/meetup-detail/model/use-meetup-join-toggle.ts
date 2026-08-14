import { useAuthStore } from '@/shared/auth';
import { useMeetupMembers } from '../api/use-meetup-members';
import { useJoinMeetup } from '../api/use-join-meetup';
import { useLeaveMeetup } from '../api/use-leave-meetup';

export function useMeetupJoinToggle(meetupId: number, enabled = true) {
  const currentUuid = useAuthStore((state) => state.userUuid);
  const { members } = useMeetupMembers(meetupId, enabled);
  const isJoined = members.some((m) => m.user.uuid === currentUuid);

  const { mutate: handleJoin, isPending: isJoining } = useJoinMeetup(meetupId);
  const { mutate: handleLeave, isPending: isLeaving } =
    useLeaveMeetup(meetupId);

  return { isJoined, handleJoin, handleLeave, isJoining, isLeaving };
}
