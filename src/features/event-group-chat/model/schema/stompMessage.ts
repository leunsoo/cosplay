import { z } from 'zod';

// STOMP publish body
export const EventChatSendPayloadSchema = z.object({
  senderUuid: z.string().min(1),
  content: z.string().min(1),
  type: z.literal('TEXT'),
});

// STOMP subscribe 수신 body
export const EventChatReceivePayloadSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  eventId: z.number().int().positive(),
  senderUuid: z.string().min(1),
  senderNickname: z.string(),
  senderProfileImageUri: z.string().nullable().optional(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});

// 접속 인원 수신 body
export const EventChatActiveCountPayloadSchema = z.object({
  count: z.number().int().nonnegative(),
});

export type EventChatSendPayload = z.infer<typeof EventChatSendPayloadSchema>;
export type EventChatReceivePayload = z.infer<
  typeof EventChatReceivePayloadSchema
>;
export type EventChatActiveCountPayload = z.infer<
  typeof EventChatActiveCountPayloadSchema
>;
