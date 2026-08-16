import type { OfficialEvent } from '@/entities/event';

export type FavoriteEvent = Pick<
  OfficialEvent,
  | 'id'
  | 'title'
  | 'imageUrl'
  | 'location'
  | 'price'
  | 'category'
  | 'status'
  | 'dateInfo'
>;
