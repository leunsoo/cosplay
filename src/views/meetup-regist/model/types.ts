export interface MeetupFormData {
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  location: string;
  locationDetail: string;
  maxMembers: string;
  thumbnailFile: File | null;
  thumbnailPreview: string;
}

export interface CreateMeetupBody {
  title: string;
  description: string;
  scheduledAt: string;
  maxMembers: number;
  location: string;
  locationDetail: string;
  thumbnailUrl?: string;
}
