import { z } from 'zod';

export const MeetupChatSendPayloadSchema = z.object({
  senderUuid: z.string().min(1),
  content: z.string().min(1),
  type: z.literal('TEXT'),
});

export const MeetupChatReceivePayloadSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  meetupId: z.number().int().positive(),
  senderUuid: z.string().min(1),
  senderNickname: z.string(),
  senderProfileImageUri: z.string().nullable().optional(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});

export const MeetupChatActiveCountPayloadSchema = z.object({
  count: z.number().int().nonnegative(),
});

export type MeetupChatSendPayload = z.infer<typeof MeetupChatSendPayloadSchema>;
export type MeetupChatReceivePayload = z.infer<
  typeof MeetupChatReceivePayloadSchema
>;
export type MeetupChatActiveCountPayload = z.infer<
  typeof MeetupChatActiveCountPayloadSchema
>;
