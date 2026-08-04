import { z } from 'zod';

const MeetupHostSchema = z.object({
  uuid: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable().optional(),
});

export const MeetupDetailDTOSchema = z.object({
  meetupId: z.number().int().positive(),
  host: MeetupHostSchema,
  title: z.string(),
  description: z.string(),
  scheduledAt: z.string(),
  location: z.string(),
  locationDetail: z.string().nullable().optional(),
  maxMembers: z.number(),
  currentMembers: z.number(),
  status: z.enum(['UPCOMING', 'ONGOING', 'CLOSED']),
  thumbnailUrl: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type MeetupDetailDTO = z.infer<typeof MeetupDetailDTOSchema>;
