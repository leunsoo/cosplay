export {
  EventDetailDTOSchema,
  type EventDetailDTO,
  type UploaderDTO,
} from '@/shared/api/endpoints/event';
export {
  mapEventDetailDtoToEventDetailWithUploader,
  type EventDetailWithUploader,
} from './mapper';
export type { OfficialEventDetail } from './event';
