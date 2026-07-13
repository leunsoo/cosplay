import { apiClient, type ApiResponse } from '@/shared/api';
import {
  GetEventChatRoomParamsSchema,
  EventChatRoomDTOSchema,
  GetEventChatMessagesParamsSchema,
  EventChatMessageListDTOSchema,
  GetEventChatActiveCountParamsSchema,
  EventChatActiveCountDTOSchema,
  type GetEventChatRoomParams,
  type EventChatRoomDTO,
  type GetEventChatMessagesParams,
  type EventChatMessageListDTO,
  type GetEventChatActiveCountParams,
  type EventChatActiveCountDTO,
} from '../model/schema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import {
  mockEventChatRoom,
  mockEventChatMessages,
  mockEventChatActiveCount,
} from '@/mocks/group-chat';

/**
 * 행사 채팅방 조회 API
 * @param params - 경로 파라미터 (eventId)
 * @returns 행사 채팅방 정보 (Zod로 검증됨)
 */
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

/**
 * 행사 최근 메시지 조회 API
 * @param params - 경로 파라미터 (eventId) 및 쿼리 파라미터 (limit)
 * @returns 메시지 목록 (Zod로 검증됨)
 */
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

/**
 * 행사 채팅 접속 인원 조회 API
 * @param params - 경로 파라미터 (eventId)
 * @returns 접속 인원 수 (Zod로 검증됨)
 */
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
