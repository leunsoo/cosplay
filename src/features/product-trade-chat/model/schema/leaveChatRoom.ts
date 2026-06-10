import { z } from 'zod';

// Request 스키마
export const LeaveChatRoomParamsSchema = z.object({
  roomId: z.number().int().positive(),
});

export const LeaveChatRoomBodySchema = z.object({
  userUuid: z.string().min(1),
});

// 타입 추론
export type LeaveChatRoomParams = z.infer<typeof LeaveChatRoomParamsSchema>;
export type LeaveChatRoomBody = z.infer<typeof LeaveChatRoomBodySchema>;
