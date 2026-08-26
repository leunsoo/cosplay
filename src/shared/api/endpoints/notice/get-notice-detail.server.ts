import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockNoticeDetails } from '@/mocks';
import { NoticeDetailSchema, type NoticeDetail } from './notice';

export function getMockNoticeDetail(
  noticeId: number
): ApiResponse<NoticeDetail> {
  const detail = mockNoticeDetails[noticeId] ?? mockNoticeDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}

export const getNoticeDetailServer = async (
  noticeId: number
): Promise<ApiResponse<NoticeDetail>> => {
  if (IS_DEMO) return getMockNoticeDetail(noticeId);
  return serverFetch(`/api/v1/notices/${noticeId}`, NoticeDetailSchema, {
    revalidate: 300,
    tags: ['notices'],
  });
};
