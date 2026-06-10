import { apiClient, type ApiResponse } from '@/shared/api';
import { PresignedUrlDataSchema, type PresignedUrlData } from '../model';
import type { CreateMeetupBody } from '../model';

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
): Promise<ApiResponse<number>> => apiClient.post('/api/v1/meetups', body);

export const updateMeetup = (
  meetupId: number,
  body: CreateMeetupBody & { thumbnailUrl: string; locationDetail: string }
): Promise<ApiResponse<void>> =>
  apiClient.put(`/api/v1/meetups/${meetupId}`, body);
