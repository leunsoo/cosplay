export { type MeetupFormData } from './types';
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
