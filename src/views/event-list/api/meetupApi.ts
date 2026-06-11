import { apiClient, type ApiResponse } from '@/shared/api';
import {
  MeetupListDTOSchema,
  type MeetupListDTO,
} from '../model/schema/getMeetupList';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupList } from '@/mocks/meetup';

export type MeetupStatus = 'ALL' | 'ONGOING' | 'CLOSED';

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
