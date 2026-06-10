import { z } from 'zod';

export const PresignedUrlDataSchema = z.object({
  uploadUrl: z.string(),
  imageUrl: z.string(),
});

export type PresignedUrlData = z.infer<typeof PresignedUrlDataSchema>;
