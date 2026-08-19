import { z } from 'zod';
import { apiClient, serverFetch, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { mockEventDetails } from '@/mocks';

const UploaderDTOSchema = z.object({
  uuid: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
});
export type UploaderDTO = z.infer<typeof UploaderDTOSchema>;

const ScheduleItemSchema = z.object({
  content: z.string(),
  date: z.string(),
  time: z.string(),
});
export type ScheduleItem = z.infer<typeof ScheduleItemSchema>;

export const EventDetailDTOSchema = z.object({
  eventId: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  thumbnailUrl: z.string(),
  startDate: z.string(),
  status: z.enum(['UPCOMING', 'ONGOING', 'CLOSED']),
  price: z.number(),
  endDate: z.string(),
  location: z.string(),
  locationDetail: z.string().nullable(),
  uploader: UploaderDTOSchema.nullable(),
  category: z.string(),
  recommended: z.boolean(),
  schedules: z.array(ScheduleItemSchema).nullable(),
});
export type EventDetailDTO = z.infer<typeof EventDetailDTOSchema>;

export interface GetEventDetailParams {
  eventId: number;
}

function resolveDemoEventDetail(eventId: number): ApiResponse<EventDetailDTO> {
  const detail = mockEventDetails[eventId] ?? mockEventDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}

export const getEventDetail = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return apiClient.getWithValidation(
    `/api/v1/events/${params.eventId}`,
    EventDetailDTOSchema
  );
};

// 서버 컴포넌트 / prefetchQuery 전용: apiClient(axios)는 내부적으로
// Zustand(useAuthStore)를 참조해 서버 컴포넌트에서 사용할 수 없음
export const getEventDetailServer = async (
  params: GetEventDetailParams
): Promise<ApiResponse<EventDetailDTO>> => {
  if (IS_DEMO) return resolveDemoEventDetail(params.eventId);
  return serverFetch(`/api/v1/events/${params.eventId}`, EventDetailDTOSchema, {
    revalidate: 300,
    tags: ['events'],
  });
};
