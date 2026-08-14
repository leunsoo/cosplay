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

export const INITIAL_FORM_DATA: MeetupFormData = {
  title: '',
  description: '',
  eventDate: '',
  eventTime: '',
  location: '',
  locationDetail: '',
  maxMembers: '',
  thumbnailFile: null,
  thumbnailPreview: '',
};
