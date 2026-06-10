import { z } from 'zod';

// Request 스키마
export const ResolveChatRoomParamsSchema = z.object({
  productId: z.number().int().positive(),
  buyerUuid: z.string().min(1),
  sellerUuid: z.string().min(1),
});

// Response 스키마
export const ResolveChatRoomDTOSchema = z.object({
  exists: z.boolean(),
  roomId: z.number().int().nonnegative().nullable(),
});

// 타입 추론
export type ResolveChatRoomParams = z.infer<typeof ResolveChatRoomParamsSchema>;
export type ResolveChatRoomDTO = z.infer<typeof ResolveChatRoomDTOSchema>;
