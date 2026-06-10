import { apiClient, type ApiResponse } from '@/shared/api';
import {
  MeetupListDTOSchema,
  type MeetupListDTO,
} from '../model/schema/getMeetupList';

export type MeetupStatus = 'ALL' | 'ONGOING' | 'CLOSED';

export const getMeetupList = (
  status: MeetupStatus = 'ALL'
): Promise<ApiResponse<MeetupListDTO>> =>
  apiClient.getWithValidation(
    `/api/v1/meetups?status=${status}`,
    MeetupListDTOSchema
  );
