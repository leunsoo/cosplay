import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { getDemoMeetupMembers } from '@/mocks';
import { MeetupUserSummarySchema } from './get-meetup-detail';

const MeetupMemberDTOSchema = z.object({
  user: MeetupUserSummarySchema,
  joinedAt: z.string(),
});

export const MeetupMembersDTOSchema = z.array(MeetupMemberDTOSchema);

export type MeetupMembersDTO = z.infer<typeof MeetupMembersDTOSchema>;
export type MeetupMemberDTO = z.infer<typeof MeetupMemberDTOSchema>;

export const getMeetupMembers = async (
  meetupId: number
): Promise<ApiResponse<MeetupMembersDTO>> => {
  if (IS_DEMO) {
    return {
      status: 'SUCCESS',
      message: '성공',
      data: getDemoMeetupMembers(meetupId),
    };
  }
  return apiClient.getWithValidation(
    `/api/v1/meetups/${meetupId}/members`,
    MeetupMembersDTOSchema
  );
};
