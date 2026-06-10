import { z } from 'zod';

// Request 스키마
export const CreateChatRoomBodySchema = z.object({
  productId: z.number().int().positive(),
  buyerUuid: z.string().min(1),
  sellerUuid: z.string().min(1),
});

// Response 스키마
export const CreateChatRoomDTOSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  buyerUuid: z.string(),
  sellerUuid: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 타입 추론
export type CreateChatRoomBody = z.infer<typeof CreateChatRoomBodySchema>;
export type CreateChatRoomDTO = z.infer<typeof CreateChatRoomDTOSchema>;
