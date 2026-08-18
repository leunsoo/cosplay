import type { FavoriteMeetupListDTO } from '@/shared/api/favorite-meetup';
import type { FavoriteMeetupStatusDTO } from '@/features/favorite-meetup/api/get-favorite-meetup-status';
import { mockMeetupList } from './meetup';

// 데모 모드 찜 상태 (메모리 유지, 새로고침 시 초기화)
export const demoFavoriteMeetupIds = new Set<number>([1]);

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
