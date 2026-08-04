import { apiClient, type ApiResponse } from '@/shared/api';
import { PresignedUrlDataSchema, type PresignedUrlData } from '../model';
import type { CreateMeetupBody } from '../model';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoMeetup, updateDemoMeetup } from '@/mocks';

export const getMeetupPresignedUrl = (
  filename: string
): Promise<ApiResponse<PresignedUrlData>> =>
  apiClient.postWithValidation(
    '/api/v1/meetups/presigned-url',
    PresignedUrlDataSchema,
    {
      filename,
    }
  );

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
