import { z } from 'zod';

// Request 스키마
export const GetEventChatMessagesParamsSchema = z.object({
  eventId: z.number().int().positive(),
  limit: z.number().int().positive().optional(),
  before: z.number().int().nonnegative().optional(),
});

// Response 스키마
export const EventChatMessageDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  eventId: z.number().int().positive(),
  senderUuid: z.string(),
  senderNickname: z.string(),
  senderProfileImageUri: z.string().nullable().optional(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});

export const EventChatMessageListDTOSchema = z.array(EventChatMessageDTOSchema);

// 타입 추론
export type GetEventChatMessagesParams = z.infer<
  typeof GetEventChatMessagesParamsSchema
>;
export type EventChatMessageDTO = z.infer<typeof EventChatMessageDTOSchema>;
export type EventChatMessageListDTO = z.infer<
  typeof EventChatMessageListDTOSchema
>;
