import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';

const PresignedUrlDataSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});

type PresignedUrlData = z.infer<typeof PresignedUrlDataSchema>;

export const getMeetupPresignedUrl = (
  filename: string
): Promise<ApiResponse<PresignedUrlData>> =>
  apiClient.postWithValidation(
    '/api/v1/meetups/presigned-url',
    PresignedUrlDataSchema,
    { filename }
  );
