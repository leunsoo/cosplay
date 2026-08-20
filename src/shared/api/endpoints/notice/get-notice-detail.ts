import { apiClient } from '../../api-client';
import { type ApiResponse } from '../../response';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockNoticeDetails } from '@/mocks';
import { NoticeDetailSchema, type NoticeDetail } from './notice';

export function getNoticeDetail(
  noticeId: number
): Promise<ApiResponse<NoticeDetail>> {
  if (IS_DEMO) {
    const detail = mockNoticeDetails[noticeId] ?? mockNoticeDetails[1];
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: detail,
    });
  }

  return apiClient.getWithValidation(
    `/api/v1/notices/${noticeId}`,
    NoticeDetailSchema
  );
}
