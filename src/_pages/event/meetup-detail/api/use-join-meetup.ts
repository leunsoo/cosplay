import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { joinDemoMeetup } from '@/mocks';
import { MEETUP_QUERIES } from '@/shared/api/meetup';

const joinMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    joinDemoMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.post(`/api/v1/meetups/${meetupId}/join`);
};

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
