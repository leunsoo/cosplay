import { z } from 'zod';

export const GetMeetupChatMessagesParamsSchema = z.object({
  meetupId: z.number().int().positive(),
  limit: z.number().int().positive().optional(),
  before: z.number().int().nonnegative().optional(),
});

export const MeetupChatMessageDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  meetupId: z.number().int().positive(),
  senderUuid: z.string(),
  senderNickname: z.string(),
  senderProfileImageUri: z.string().nullable().optional(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});

export const MeetupChatMessageListDTOSchema = z.array(MeetupChatMessageDTOSchema);

export type GetMeetupChatMessagesParams = z.infer<typeof GetMeetupChatMessagesParamsSchema>;
export type MeetupChatMessageDTO = z.infer<typeof MeetupChatMessageDTOSchema>;
export type MeetupChatMessageListDTO = z.infer<typeof MeetupChatMessageListDTOSchema>;
