import { z } from 'zod';

const MeetupItemDTOSchema = z.object({
  meetupId: z.number().int().positive(),
  title: z.string(),
  thumbnailUrl: z.string().nullable(),
  scheduledAt: z.string(),
  location: z.string(),
  maxMembers: z.number(),
  currentMembers: z.number(),
  status: z.enum(['ONGOING', 'CLOSED']),
});

export const MeetupListDTOSchema = z.array(MeetupItemDTOSchema);

export type MeetupListDTO = z.infer<typeof MeetupListDTOSchema>;
export type MeetupItemDTO = z.infer<typeof MeetupItemDTOSchema>;
