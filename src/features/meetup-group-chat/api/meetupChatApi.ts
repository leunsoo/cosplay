import { apiClient, type ApiResponse } from '@/shared/api';
import {
  GetMeetupChatRoomParamsSchema,
  MeetupChatRoomDTOSchema,
  GetMeetupChatMessagesParamsSchema,
  MeetupChatMessageListDTOSchema,
  GetMeetupChatActiveCountParamsSchema,
  MeetupChatActiveCountDTOSchema,
  type GetMeetupChatRoomParams,
  type MeetupChatRoomDTO,
  type GetMeetupChatMessagesParams,
  type MeetupChatMessageListDTO,
  type GetMeetupChatActiveCountParams,
  type MeetupChatActiveCountDTO,
} from '../model/schema';

export const getMeetupChatRoom = async (
  params: GetMeetupChatRoomParams
): Promise<ApiResponse<MeetupChatRoomDTO>> => {
  const validatedParams = GetMeetupChatRoomParamsSchema.parse(params);
  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/room`,
    MeetupChatRoomDTOSchema
  );
};

export const getMeetupChatMessages = async (
  params: GetMeetupChatMessagesParams
): Promise<ApiResponse<MeetupChatMessageListDTO>> => {
  const validatedParams = GetMeetupChatMessagesParamsSchema.parse(params);
  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/messages`,
    MeetupChatMessageListDTOSchema,
    { params: { limit: 50, before: validatedParams.before } }
  );
};

export const getMeetupChatActiveCount = async (
  params: GetMeetupChatActiveCountParams
): Promise<ApiResponse<MeetupChatActiveCountDTO>> => {
  const validatedParams = GetMeetupChatActiveCountParamsSchema.parse(params);
  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/active-count`,
    MeetupChatActiveCountDTOSchema
  );
};
