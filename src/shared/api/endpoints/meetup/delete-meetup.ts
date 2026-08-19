import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { deleteDemoMeetup, removeDemoFavoriteMeetup } from '@/mocks';

export const deleteMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    deleteDemoMeetup(meetupId);
    removeDemoFavoriteMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.delete(`/api/v1/meetups/${meetupId}`);
};
