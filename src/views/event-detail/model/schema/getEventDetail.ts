import { z } from 'zod';

// Uploader DTO 스키마
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

// Event Detail DTO 스키마
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

// 타입 추론
export type EventDetailDTO = z.infer<typeof EventDetailDTOSchema>;
export type UploaderDTO = z.infer<typeof UploaderDTOSchema>;
