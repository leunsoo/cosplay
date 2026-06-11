import { z } from 'zod';

export const GetMeetupChatRoomParamsSchema = z.object({
  meetupId: z.number().int().positive(),
});

export const MeetupChatRoomDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  meetupId: z.number().int().positive(),
  status: z.string(),
});

export type GetMeetupChatRoomParams = z.infer<
  typeof GetMeetupChatRoomParamsSchema
>;
export type MeetupChatRoomDTO = z.infer<typeof MeetupChatRoomDTOSchema>;
