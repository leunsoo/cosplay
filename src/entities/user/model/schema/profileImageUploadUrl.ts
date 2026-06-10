import { z } from 'zod';

export const ProfileImageUploadUrlBodySchema = z.object({
  filename: z.string().min(1),
});

export const ProfileImageUploadUrlDTOSchema = z.object({
  uploadUrl: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type ProfileImageUploadUrlBody = z.infer<
  typeof ProfileImageUploadUrlBodySchema
>;
export type ProfileImageUploadUrlDTO = z.infer<
  typeof ProfileImageUploadUrlDTOSchema
>;
