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

export const getMeetupDetail = (
  meetupId: number
): Promise<ApiResponse<MeetupDetailDTO>> =>
  apiClient.getWithValidation(
    `/api/v1/meetups/${meetupId}`,
    MeetupDetailDTOSchema
  );

export const getMeetupMembers = (
  meetupId: number
): Promise<ApiResponse<MeetupMembersDTO>> =>
  apiClient.getWithValidation(
    `/api/v1/meetups/${meetupId}/members`,
    MeetupMembersDTOSchema
  );

export const deleteMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.delete(`/api/v1/meetups/${meetupId}`);

export const joinMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.post(`/api/v1/meetups/${meetupId}/join`);

export const leaveMeetup = (meetupId: number): Promise<ApiResponse<void>> =>
  apiClient.delete(`/api/v1/meetups/${meetupId}/join`);
