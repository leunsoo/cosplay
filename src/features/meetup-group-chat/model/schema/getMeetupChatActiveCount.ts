import { z } from 'zod';

export const GetMeetupChatActiveCountParamsSchema = z.object({
  meetupId: z.number().int().positive(),
});

export const MeetupChatActiveCountDTOSchema = z.object({
  count: z.number().int().nonnegative(),
});

export type GetMeetupChatActiveCountParams = z.infer<typeof GetMeetupChatActiveCountParamsSchema>;
export type MeetupChatActiveCountDTO = z.infer<typeof MeetupChatActiveCountDTOSchema>;
