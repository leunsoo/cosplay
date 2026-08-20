import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockEventChatMessages } from '@/mocks';

// 행사 최근 채팅 메시지 조회 API

export const GetEventChatMessagesParamsSchema = z.object({
  eventId: z.number().int().positive(),
  limit: z.number().int().positive().optional(),
  before: z.number().int().nonnegative().optional(),
});
export type GetEventChatMessagesParams = z.infer<
  typeof GetEventChatMessagesParamsSchema
>;

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
export type EventChatMessageDTO = z.infer<typeof EventChatMessageDTOSchema>;

export const EventChatMessageListDTOSchema = z.array(EventChatMessageDTOSchema);
export type EventChatMessageListDTO = z.infer<
  typeof EventChatMessageListDTOSchema
>;

export const getEventChatMessages = async (
  params: GetEventChatMessagesParams
): Promise<ApiResponse<EventChatMessageListDTO>> => {
  const validatedParams = GetEventChatMessagesParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockEventChatMessages };

  return apiClient.getWithValidation(
    `/api/v1/events/${validatedParams.eventId}/chat/messages`,
    EventChatMessageListDTOSchema,
    {
      params: { limit: 50, before: validatedParams.before },
    }
  );
};
