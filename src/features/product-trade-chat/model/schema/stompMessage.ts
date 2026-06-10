import { z } from 'zod';

// STOMP publish body (roomId는 destination 경로에 포함)
export const StompMessagePayloadSchema = z.discriminatedUnion('type', [
  z.object({
    senderUuid: z.string().min(1),
    message: z.string().min(1),
    type: z.literal('TEXT'),
  }),
  z.object({
    senderUuid: z.string().min(1),
    message: z.string().min(1), // imageUrl을 message 필드로 전달
    type: z.literal('IMAGE'),
  }),
]);

// STOMP 수신 메시지 body (서버에서 래퍼 구조로 전달)
export const StompReceivePayloadSchema = z.object({
  type: z.literal('MESSAGE'),
  read: z.null(),
  message: z.object({
    id: z.number().int().nonnegative(),
    roomId: z.number().int().nonnegative(),
    senderUuid: z.string(),
    message: z.string(),
    type: z.string(),
    isRead: z.boolean(),
    createdAt: z.string(),
  }),
});

export type StompMessagePayload = z.infer<typeof StompMessagePayloadSchema>;
export type StompReceivePayload = z.infer<typeof StompReceivePayloadSchema>;
