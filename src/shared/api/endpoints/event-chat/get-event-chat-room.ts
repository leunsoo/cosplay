import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockEventChatRoom } from '@/mocks';

// 행사 채팅방 조회 API

export const GetEventChatRoomParamsSchema = z.object({
  eventId: z.number().int().positive(),
});
export type GetEventChatRoomParams = z.infer<
  typeof GetEventChatRoomParamsSchema
>;

export const EventChatRoomDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  eventId: z.number().int().positive(),
  status: z.string(),
});
export type EventChatRoomDTO = z.infer<typeof EventChatRoomDTOSchema>;

export const getEventChatRoom = async (
  params: GetEventChatRoomParams
): Promise<ApiResponse<EventChatRoomDTO>> => {
  const validatedParams = GetEventChatRoomParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockEventChatRoom };

  return apiClient.getWithValidation(
    `/api/v1/events/${validatedParams.eventId}/chat/room`,
    EventChatRoomDTOSchema
  );
};
