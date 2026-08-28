import 'server-only';
import { serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/is-demo';
import {
  EventDetailDTOSchema,
  resolveDemoEventDetail,
  type EventDetailDTO,
  type GetEventDetailParams,
} from './get-event-detail';

export const getEventDetailServer = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return serverFetch(`/api/v1/events/${params.eventId}`, EventDetailDTOSchema, {
    revalidate: 300,
    tags: ['events'],
  });
};
