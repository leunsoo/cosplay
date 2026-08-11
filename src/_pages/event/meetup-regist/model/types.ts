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
