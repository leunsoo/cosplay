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
import {
  mockMeetupDetails,
  getDemoMeetupMembers,
  joinDemoMeetup,
  leaveDemoMeetup,
  deleteDemoMeetup,
  removeDemoFavoriteMeetup,
} from '@/mocks';

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

export const deleteMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    deleteDemoMeetup(meetupId);
    removeDemoFavoriteMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.delete(`/api/v1/meetups/${meetupId}`);
};

export const joinMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    joinDemoMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.post(`/api/v1/meetups/${meetupId}/join`);
};

export const leaveMeetup = (meetupId: number): Promise<ApiResponse<void>> => {
  if (IS_DEMO) {
    leaveDemoMeetup(meetupId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: undefined,
    });
  }
  return apiClient.delete(`/api/v1/meetups/${meetupId}/join`);
};
