export { PresignedUrlDataSchema, type PresignedUrlData } from './schema';
export { type MeetupFormData, type CreateMeetupBody } from './types';
export { mapFormDataToCreateMeetupBody } from './mapper';
export { useMeetUpRegist } from './hooks/useMeetUpRegist';

export const INITIAL_FORM_DATA: import('./types').MeetupFormData = {
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
