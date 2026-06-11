import { apiClient, type ApiResponse } from '@/shared/api';
import {
  NoticeListDTOSchema,
  NoticeDetailDTOSchema,
  type NoticeListDTO,
  type NoticeDetailDTO,
} from '../model/schema/noticeSchema';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockNoticeList, mockNoticeDetails } from '@/mocks/community';

export const getNoticeList = async (): Promise<ApiResponse<NoticeListDTO>> => {
  if (IS_DEMO) return { status: 'SUCCESS', message: '성공', data: mockNoticeList };
  return apiClient.getWithValidation('/api/v1/notices', NoticeListDTOSchema);
};

export const getNoticeDetail = async (
  noticeId: number
): Promise<ApiResponse<NoticeDetailDTO>> => {
  if (IS_DEMO) {
    const detail = mockNoticeDetails[noticeId] ?? mockNoticeDetails[1];
    return { status: 'SUCCESS', message: '성공', data: detail };
  }

  return apiClient.getWithValidation(
    `/api/v1/notices/${noticeId}`,
    NoticeDetailDTOSchema
  );
};
