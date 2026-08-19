'use client';

import { useDeleteQna } from '../api/use-delete-qna';

export function useQnaDelete(qnaPostId: number) {
  const { mutate: deletePost, isPending: isDeleting } = useDeleteQna();

  const remove = () => {
    if (!confirm('질문을 삭제하시겠습니까?')) return;
    deletePost(qnaPostId);
  };

  return { isDeleting, remove };
}
