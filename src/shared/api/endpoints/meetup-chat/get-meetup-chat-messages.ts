import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupChatMessages } from '@/mocks';

// 개인 행사(모임) 최근 채팅 메시지 조회 API

export const GetMeetupChatMessagesParamsSchema = z.object({
  meetupId: z.number().int().positive(),
  limit: z.number().int().positive().optional(),
  before: z.number().int().nonnegative().optional(),
});
export type GetMeetupChatMessagesParams = z.infer<
  typeof GetMeetupChatMessagesParamsSchema
>;

export const MeetupChatMessageDTOSchema = z.object({
  id: z.number().int().nonnegative(),
  roomId: z.number().int().nonnegative(),
  meetupId: z.number().int().positive(),
  senderUuid: z.string(),
  senderNickname: z.string(),
  senderProfileImageUri: z.string().nullable().optional(),
  content: z.string(),
  type: z.string(),
  createdAt: z.string(),
});
export type MeetupChatMessageDTO = z.infer<typeof MeetupChatMessageDTOSchema>;

export const MeetupChatMessageListDTOSchema = z.array(
  MeetupChatMessageDTOSchema
);
export type MeetupChatMessageListDTO = z.infer<
  typeof MeetupChatMessageListDTOSchema
>;

export const getMeetupChatMessages = async (
  params: GetMeetupChatMessagesParams
): Promise<ApiResponse<MeetupChatMessageListDTO>> => {
  const validatedParams = GetMeetupChatMessagesParamsSchema.parse(params);

  if (IS_DEMO)
    return { status: 'SUCCESS', message: '성공', data: mockMeetupChatMessages };

  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/messages`,
    MeetupChatMessageListDTOSchema,
    { params: { limit: 50, before: validatedParams.before } }
  );
};
