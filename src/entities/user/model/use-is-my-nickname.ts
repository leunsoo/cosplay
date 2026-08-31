'use client';

import { useMyProfile } from './use-my-profile';

// shared/auth의 isMe(uuid)와 같은 역할을 닉네임 기준으로 수행한다.
// 작성자를 uuid가 아니라 닉네임으로만 내려주는 API(예: QnA)에서, 로그인한
// 내 닉네임과 대상 닉네임이 같은지 판별할 때 쓴다.
// useMyProfile()은 TanStack Query 캐시를 공유하므로 여러 컴포넌트가 각자
// 호출해도 네트워크 요청은 한 번만 나간다.
export function useIsMyNickname(nickname: string | null | undefined): boolean {
  const { data: profileData } = useMyProfile();
  const myNickname = profileData?.data?.nickname ?? null;
  return !!(myNickname && nickname && myNickname === nickname);
}
