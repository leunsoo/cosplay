import type { FavoriteEventListDTO } from '@/features/favorite-event/model/schema/getFavoriteEventList';
import type { FavoriteEventStatusDTO } from '@/features/favorite-event/model/schema/getFavoriteEventStatus';
import type { FavoriteMeetupListDTO } from '@/features/favorite-meetup/model/schema/getFavoriteMeetupList';
import type { FavoriteMeetupStatusDTO } from '@/features/favorite-meetup/model/schema/getFavoriteMeetupStatus';
import type { FavoriteListDTO } from '@/features/favorite-product/model/schema/getFavoriteList';
import type { FavoriteStatusDTO } from '@/features/favorite-product/model/schema/getFavoriteStatus';
import { mockEventList } from './event';
import { mockMeetupList } from './meetup';

// 데모 모드 찜 상태 (메모리 유지, 새로고침 시 초기화)
export const demoFavoriteEventIds = new Set<number>([1, 5]);
export const demoFavoriteMeetupIds = new Set<number>([1]);

// 찜한 시각은 실제 값이 중요하지 않으므로 찜한 시점의 현재 시각으로 고정
const demoFavoritedAtByEventId = new Map<number, string>(
  [...demoFavoriteEventIds].map((eventId) => [
    eventId,
    new Date().toISOString(),
  ])
);

export function getDemoFavoriteEventList(): FavoriteEventListDTO {
  const events = mockEventList
    .filter((event) => demoFavoriteEventIds.has(event.eventId))
    .map((event) => ({
      ...event,
      favoritedAt:
        demoFavoritedAtByEventId.get(event.eventId) ?? new Date().toISOString(),
    }))
    // 최근 찜한 순으로 정렬 (실제 API의 찜한 시각 최신순 정렬을 재현)
    .sort((a, b) => b.favoritedAt.localeCompare(a.favoritedAt));

  return { totalCount: events.length, events };
}

export function getDemoFavoriteEventStatus(
  eventId: number
): FavoriteEventStatusDTO {
  return { isFavorited: demoFavoriteEventIds.has(eventId) };
}

export function addDemoFavoriteEvent(eventId: number): void {
  demoFavoriteEventIds.add(eventId);
  demoFavoritedAtByEventId.set(eventId, new Date().toISOString());
}

export function removeDemoFavoriteEvent(eventId: number): void {
  demoFavoriteEventIds.delete(eventId);
  demoFavoritedAtByEventId.delete(eventId);
}

// 찜한 시각은 실제 값이 중요하지 않으므로 찜한 시점의 현재 시각으로 고정
const demoFavoritedAtByMeetupId = new Map<number, string>(
  [...demoFavoriteMeetupIds].map((meetupId) => [
    meetupId,
    new Date().toISOString(),
  ])
);

export function getDemoFavoriteMeetupList(): FavoriteMeetupListDTO {
  const meetups = mockMeetupList
    .filter((meetup) => demoFavoriteMeetupIds.has(meetup.meetupId))
    .map((meetup) => ({
      ...meetup,
      thumbnailUrl: meetup.thumbnailUrl ?? '',
      favoritedAt:
        demoFavoritedAtByMeetupId.get(meetup.meetupId) ??
        new Date().toISOString(),
    }))
    // 최근 찜한 순으로 정렬 (실제 API의 찜한 시각 최신순 정렬을 재현)
    .sort((a, b) => b.favoritedAt.localeCompare(a.favoritedAt));

  return { totalCount: meetups.length, meetups };
}

export function getDemoFavoriteMeetupStatus(
  meetupId: number
): FavoriteMeetupStatusDTO {
  return { isFavorited: demoFavoriteMeetupIds.has(meetupId) };
}

export function addDemoFavoriteMeetup(meetupId: number): void {
  demoFavoriteMeetupIds.add(meetupId);
  demoFavoritedAtByMeetupId.set(meetupId, new Date().toISOString());
}

export function removeDemoFavoriteMeetup(meetupId: number): void {
  demoFavoriteMeetupIds.delete(meetupId);
  demoFavoritedAtByMeetupId.delete(meetupId);
}

export const mockFavoriteProductList: FavoriteListDTO = {
  totalCount: 2,
  products: [
    {
      productId: 2,
      title: '제로투 공주 드레스 풀세트 (다링 인 더 프랑스)',
      price: 58000,
      mainImageUrl: 'https://picsum.photos/seed/prod-zerotwo/400/400',
      favoritedAt: '2025-06-10T14:00:00',
      status: 'SELLING',
    },
    {
      productId: 4,
      title: '아리 코스프레 의상 (리그 오브 레전드)',
      price: 65000,
      mainImageUrl: 'https://picsum.photos/seed/prod-ahri/400/400',
      favoritedAt: '2025-06-12T11:00:00',
      status: 'SELLING',
    },
  ],
};

export const mockFavoriteProductStatus: FavoriteStatusDTO = {
  isFavorited: false,
};
