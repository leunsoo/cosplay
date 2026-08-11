import type { MeetupFormData } from './types';
import type { CreateMeetupBody } from '@/shared/api/meetup';

export function mapFormDataToCreateMeetupBody(
  formData: MeetupFormData,
  thumbnailUrl?: string
): CreateMeetupBody {
  const scheduledAt = new Date(
    `${formData.eventDate}T${formData.eventTime || '00:00'}`
  ).toISOString();

  return {
    title: formData.title,
    description: formData.description,
    scheduledAt,
    maxMembers: Number(formData.maxMembers),
    location: formData.location,
    locationDetail: formData.locationDetail,
    ...(thumbnailUrl ? { thumbnailUrl } : {}),
  };
}
