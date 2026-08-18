import type { PersonalEvent } from '@/entities/event';

export type FavoriteMeetup = Pick<
  PersonalEvent,
  | 'id'
  | 'title'
  | 'imageUrl'
  | 'location'
  | 'dateInfo'
  | 'currentMembers'
  | 'maxMembers'
  | 'status'
>;
