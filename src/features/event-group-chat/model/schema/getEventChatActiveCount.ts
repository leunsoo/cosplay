import { z } from 'zod';

// Request 스키마
export const GetEventChatActiveCountParamsSchema = z.object({
  eventId: z.number().int().positive(),
});

// Response 스키마
export const EventChatActiveCountDTOSchema = z.object({
  count: z.number().int().nonnegative(),
});

// 타입 추론
export type GetEventChatActiveCountParams = z.infer<
  typeof GetEventChatActiveCountParamsSchema
>;
export type EventChatActiveCountDTO = z.infer<
  typeof EventChatActiveCountDTOSchema
>;
