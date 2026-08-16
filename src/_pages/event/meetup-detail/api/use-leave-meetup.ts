import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { leaveDemoMeetup } from '@/mocks';
import { MEETUP_QUERIES } from '@/shared/api/meetup';

const leaveMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    leaveDemoMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.delete(`/api/v1/meetups/${meetupId}/join`);
};

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
