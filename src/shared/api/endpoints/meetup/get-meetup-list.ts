import { z } from 'zod';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockMeetupList } from '@/mocks';

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
