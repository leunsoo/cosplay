import { useAuthStore } from './authStore';

/**
 * 현재 로그인한 유저가 대상 uuid의 주인인지 확인합니다.
 *
 * @param targetUuid - 비교할 대상의 uuid
 * @returns 본인 여부
 */
export const isMe = (targetUuid: string): boolean => {
  const currentUuid = useAuthStore.getState().userUuid;
  return !!currentUuid && currentUuid === targetUuid;
};
