'use client';

import { useIsMyNickname } from '@/entities/user';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { useQnaDelete } from './use-qna-delete';

// 데스크탑 버튼/모바일 메뉴가 각자 독립적으로 호출한다. useMyProfile()이
// TanStack Query 캐시를 공유하므로 두 군데서 불러도 네트워크 요청은 중복되지
// 않는다 — 그래서 Context 없이도 "같은 상태"를 두 컴포넌트가 같이 볼 수 있다.
export function useQnaOwnerActions(post: QnaDetail, qnaPostId: number) {
  const isMyPost = useIsMyNickname(post.inquirer);
  const { isDeleting, remove } = useQnaDelete(qnaPostId);

  return { isMyPost, isDeleting, remove };
}
