import { z } from 'zod';

// Request 스키마
export const GetChatMessagesParamsSchema = z.object({
  roomId: z.number().int().positive(),
  userUuid: z.string(),
  before: z.number().int().positive().optional(),
});

// Response 스키마
export const MessageDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  senderUuid: z.string(),
  message: z.string(),
  type: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const MessageListDTOSchema = z.array(MessageDTOSchema);

// 타입 추론
export type GetChatMessagesParams = z.infer<typeof GetChatMessagesParamsSchema>;
export type MessageDTO = z.infer<typeof MessageDTOSchema>;
export type MessageListDTO = z.infer<typeof MessageListDTOSchema>;
