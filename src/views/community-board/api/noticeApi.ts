import { apiClient, type ApiResponse } from '@/shared/api';
import {
  NoticeListDTOSchema,
  NoticeDetailDTOSchema,
  type NoticeListDTO,
  type NoticeDetailDTO,
} from '../model/schema/noticeSchema';

export const getNoticeList = async (): Promise<ApiResponse<NoticeListDTO>> => {
  return apiClient.getWithValidation('/api/v1/notices', NoticeListDTOSchema);
};

export const getNoticeDetail = async (
  noticeId: number,
): Promise<ApiResponse<NoticeDetailDTO>> => {
  return apiClient.getWithValidation(
    `/api/v1/notices/${noticeId}`,
    NoticeDetailDTOSchema,
  );
};
