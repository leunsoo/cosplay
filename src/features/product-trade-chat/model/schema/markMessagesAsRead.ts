import { z } from 'zod';

// Request 스키마
export const MarkMessagesAsReadBodySchema = z.object({
  roomId: z.number().int().nonnegative(),
  readerUuid: z.string().uuid(),
});

// Response 스키마
export const MarkMessagesAsReadDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  readerUuid: z.string().uuid(),
  updatedCount: z.number().int().nonnegative(),
});

// 타입 추론
export type MarkMessagesAsReadBody = z.infer<
  typeof MarkMessagesAsReadBodySchema
>;
export type MarkMessagesAsReadDTO = z.infer<typeof MarkMessagesAsReadDTOSchema>;
