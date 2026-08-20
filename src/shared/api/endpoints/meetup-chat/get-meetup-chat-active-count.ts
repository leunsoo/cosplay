import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockMeetupChatActiveCount } from '@/mocks';

// 개인 행사(모임) 채팅 접속 인원 조회 API

export const GetMeetupChatActiveCountParamsSchema = z.object({
  meetupId: z.number().int().positive(),
});
export type GetMeetupChatActiveCountParams = z.infer<
  typeof GetMeetupChatActiveCountParamsSchema
>;

export const MeetupChatActiveCountDTOSchema = z.object({
  count: z.number().int().nonnegative(),
});
export type MeetupChatActiveCountDTO = z.infer<
  typeof MeetupChatActiveCountDTOSchema
>;

export const getMeetupChatActiveCount = async (
  params: GetMeetupChatActiveCountParams
): Promise<ApiResponse<MeetupChatActiveCountDTO>> => {
  const validatedParams = GetMeetupChatActiveCountParamsSchema.parse(params);

  if (IS_DEMO)
    return {
      status: 'SUCCESS',
      message: '성공',
      data: mockMeetupChatActiveCount,
    };

  return apiClient.getWithValidation(
    `/api/v1/meetups/${validatedParams.meetupId}/chat/active-count`,
    MeetupChatActiveCountDTOSchema
  );
};
