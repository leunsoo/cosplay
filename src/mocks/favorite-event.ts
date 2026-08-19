import type { FavoriteEventListDTO } from '@/shared/api/endpoints/favorite-event';
import type { FavoriteEventStatusDTO } from '@/shared/api/endpoints/favorite-event';
import { mockEventList } from './event';

// 데모 모드 찜 상태 (메모리 유지, 새로고침 시 초기화)
export const demoFavoriteEventIds = new Set<number>([1, 5]);

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
