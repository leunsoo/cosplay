import { z } from 'zod';

// Request 스키마
export const GetEventChatRoomParamsSchema = z.object({
  eventId: z.number().int().positive(),
});

// Response 스키마
export const EventChatRoomDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  eventId: z.number().int().positive(),
  status: z.string(),
});

// 타입 추론
export type GetEventChatRoomParams = z.infer<
  typeof GetEventChatRoomParamsSchema
>;
export type EventChatRoomDTO = z.infer<typeof EventChatRoomDTOSchema>;
