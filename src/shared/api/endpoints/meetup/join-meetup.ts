import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { joinDemoMeetup } from '@/mocks';

export const joinMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
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
