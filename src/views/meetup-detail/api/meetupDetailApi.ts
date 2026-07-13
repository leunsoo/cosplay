import { apiClient } from '@/shared/api/apiClient';
import { type ApiResponse } from '@/shared/api/response';
import {
  MeetupDetailDTOSchema,
  type MeetupDetailDTO,
} from '../model/schema/getMeetupDetail';
import {
  MeetupMembersDTOSchema,
  type MeetupMembersDTO,
} from '../model/schema/getMeetupMembers';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockMeetupDetails, mockMeetupMembers } from '@/mocks';

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

export const getMeetupMembers = async (
  meetupId: number
): Promise<ApiResponse<MeetupMembersDTO>> => {
  if (IS_DEMO) {
    const members = mockMeetupMembers[meetupId] ?? [];
    return { status: 'SUCCESS', message: '성공', data: members };
  }
  return apiClient.getWithValidation(
    `/api/v1/meetups/${meetupId}/members`,
    MeetupMembersDTOSchema
  );
};

export const deleteMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.delete(`/api/v1/meetups/${meetupId}`);

export const joinMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.post(`/api/v1/meetups/${meetupId}/join`);

export const leaveMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.delete(`/api/v1/meetups/${meetupId}/join`);
