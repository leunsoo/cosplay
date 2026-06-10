import { z } from 'zod';

// Request 스키마
export const GetChatRoomParamsSchema = z.object({
  roomId: z.number().int().nonnegative(),
  userUuid: z.string().min(1),
});

// Response 스키마
export const ChatRoomDetailDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  opponentNickname: z.string(),
  opponentProfileImageUri: z.string().nullable(),
  opponentUuid: z.string(),
  productId: z.number().int().nonnegative(),
  productPhotoUrl: z.string(),
  productTitle: z.string(),
  productPrice: z.number().optional(),
  productStatus: z.string(),
});

// 타입 추론
export type GetChatRoomParams = z.infer<typeof GetChatRoomParamsSchema>;
export type ChatRoomDetailDTO = z.infer<typeof ChatRoomDetailDTOSchema>;
