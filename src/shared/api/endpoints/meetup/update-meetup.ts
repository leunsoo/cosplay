import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { updateDemoMeetup } from '@/mocks';
import type { CreateMeetupBody } from './create-meetup';

export const updateMeetup = (
  meetupId: number,
  body: CreateMeetupBody & { thumbnailUrl: string; locationDetail: string }
): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    updateDemoMeetup(meetupId, body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.put(`/api/v1/meetups/${meetupId}`, body);
};
