import { z } from 'zod';
import { type ApiResponse } from '@/shared/api';
import { mockEventDetails } from '@/mocks';

const UploaderDTOSchema = z.object({
  uuid: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
});

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

// getEventDetailServer가 사용하는 데모 모드 조회
export function resolveDemoEventDetail(
  eventId: number
): ApiResponse<EventDetailDTO> {
  const detail = mockEventDetails[eventId] ?? mockEventDetails[1];
  return { status: 'SUCCESS', message: '성공', data: detail };
}
