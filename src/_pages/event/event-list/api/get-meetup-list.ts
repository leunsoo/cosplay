'use client';

import { z } from 'zod';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupList } from '@/mocks';
import { MEETUP_QUERIES } from '@/shared/api/meetup';

export type MeetupStatus = 'ALL' | 'ONGOING' | 'CLOSED';

const MeetupItemDTOSchema = z.object({
  meetupId: z.number().int().positive(),
  title: z.string(),
  thumbnailUrl: z.string().nullable(),
  scheduledAt: z.string(),
  location: z.string(),
  maxMembers: z.number(),
  currentMembers: z.number(),
  status: z.enum(['ONGOING', 'CLOSED']),
});

export const MeetupListDTOSchema = z.array(MeetupItemDTOSchema);

export type MeetupListDTO = z.infer<typeof MeetupListDTOSchema>;
export type MeetupItemDTO = z.infer<typeof MeetupItemDTOSchema>;

export const getMeetupList = async (
  status: MeetupStatus = 'ALL'
): Promise<ApiResponse<MeetupListDTO>> => {
  if (IS_DEMO) {
    const filtered =
      status === 'ALL'
        ? mockMeetupList
        : mockMeetupList.filter((m) => m.status === status);
    return { status: 'SUCCESS', message: '성공', data: filtered };
  }
  return apiClient.getWithValidation(
    `/api/v1/meetups?status=${status}`,
    MeetupListDTOSchema
  );
};

export function useMeetupList(status: MeetupStatus, enabled: boolean) {
  return useQuery({
    // MEETUP_QUERIES.all()과 같은 접두사를 써서, meetup-regist/meetup-detail의
    // 전체 무효화(MEETUP_QUERIES.all())가 이 목록 캐시도 함께 무효화하도록 한다.
    queryKey: [...MEETUP_QUERIES.all(), 'list', status],
    queryFn: () => getMeetupList(status),
    enabled,
    staleTime: 3 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
