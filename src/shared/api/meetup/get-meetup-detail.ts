import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupDetails } from '@/mocks';

// 개인 행사(모임) 관련 API 전반에서 host/참여자 표시에 공통으로 쓰는 사용자 요약 정보
export const MeetupUserSummarySchema = z.object({
  uuid: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable().optional(),
});

export const MeetupDetailDTOSchema = z.object({
  meetupId: z.number().int().positive(),
  host: MeetupUserSummarySchema,
  title: z.string(),
  description: z.string(),
  scheduledAt: z.string(),
  location: z.string(),
  locationDetail: z.string().nullable().optional(),
  maxMembers: z.number(),
  currentMembers: z.number(),
  status: z.enum(['UPCOMING', 'ONGOING', 'CLOSED']),
  thumbnailUrl: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type MeetupDetailDTO = z.infer<typeof MeetupDetailDTOSchema>;

export const getMeetupDetail = async (
  meetupId: number
): Promise<ApiResponse<MeetupDetailDTO>> => {
  if (IS_DEMO) {
    const detail = mockMeetupDetails[meetupId] ?? mockMeetupDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }
  return apiClient.getWithValidation(
    `/api/v1/meetups/${meetupId}`,
    MeetupDetailDTOSchema
  );
};
