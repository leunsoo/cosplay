import { apiClient } from '../../api-client';
import { type ApiResponse } from '../../response';
import { IS_DEMO } from '@/shared/lib/is-demo';
import { mockNoticeList } from '@/mocks';
import { NoticeListSchema, type NoticeList } from './notice';

export function getNoticeList(): Promise<ApiResponse<NoticeList>> {
  if (IS_DEMO)
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: mockNoticeList,
    });
  return apiClient.getWithValidation('/api/v1/notices', NoticeListSchema);
}
