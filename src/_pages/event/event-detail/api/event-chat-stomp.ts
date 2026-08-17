import { z } from 'zod';

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
export type EventChatReceivePayload = z.infer<
  typeof EventChatReceivePayloadSchema
>;
