import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupChatRoom } from '@/mocks';

// 개인 행사(모임) 채팅방 조회 API

export const GetMeetupChatRoomParamsSchema = z.object({
  meetupId: z.number().int().positive(),
});
export type GetMeetupChatRoomParams = z.infer<
  typeof GetMeetupChatRoomParamsSchema
>;

export const MeetupChatRoomDTOSchema = z.object({
  roomId: z.number().int().nonnegative(),
  meetupId: z.number().int().positive(),
  status: z.string(),
});
export type MeetupChatRoomDTO = z.infer<typeof MeetupChatRoomDTOSchema>;

export const getMeetupChatRoom = async (
  params: GetMeetupChatRoomParams
): Promise<ApiResponse<MeetupChatRoomDTO>> => {
  const validatedParams = GetMeetupChatRoomParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockMeetupChatRoom };

  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/room`,
    MeetupChatRoomDTOSchema
  );
};
