import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoMeetup } from '@/mocks';

export interface CreateMeetupBody {
  title: string;
  description: string;
  scheduledAt: string;
  maxMembers: number;
  location: string;
  locationDetail: string;
  thumbnailUrl?: string;
}

export const createMeetup = (
  body: CreateMeetupBody
): Promise<ApiResponse<number>> => {
  if (IS_DEMO) {
    const meetupId = createDemoMeetup(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: meetupId,
    });
  }
  return apiClient.post('/api/v1/meetups', body);
};
