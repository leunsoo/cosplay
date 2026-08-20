import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockEventChatActiveCount } from '@/mocks';

// 행사 채팅 접속 인원 조회 API

export const GetEventChatActiveCountParamsSchema = z.object({
  eventId: z.number().int().positive(),
});
export type GetEventChatActiveCountParams = z.infer<
  typeof GetEventChatActiveCountParamsSchema
>;

export const EventChatActiveCountDTOSchema = z.object({
  count: z.number().int().nonnegative(),
});
export type EventChatActiveCountDTO = z.infer<
  typeof EventChatActiveCountDTOSchema
>;

export const getEventChatActiveCount = async (
  params: GetEventChatActiveCountParams
): Promise<ApiResponse<EventChatActiveCountDTO>> => {
  const validatedParams = GetEventChatActiveCountParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: mockEventChatActiveCount,
    };

  return apiClient.getWithValidation(
    `/api/v1/events/${validatedParams.eventId}/chat/active-count`,
    EventChatActiveCountDTOSchema
  );
};
