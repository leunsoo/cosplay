import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { leaveDemoMeetup } from '@/mocks';

export const leaveMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
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
