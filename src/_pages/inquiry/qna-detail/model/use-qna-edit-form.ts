'use client';

import { useState } from 'react';
import type { QnaDetail } from '@/shared/api/endpoints/qna';
import { useUpdateQna } from '../api/use-update-qna';

// 질문 게시글의 수정 폼 상태 관리. post는 로딩 여부와 무관하게 항상 전달
// 가능해야 하며(비어있는 동안엔 start()가 아무 것도 하지 않음), 실제로
// 값이 채워지는 시점은 사용자가 "수정" 버튼을 눌러 start()가 호출될 때다.
export function useQnaEditForm(post: QnaDetail | null, qnaPostId: number) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate: updatePost, isPending: isUpdating } = useUpdateQna(qnaPostId);

  const start = () => {
    if (!post) return;
    setTitle(post.title);
    setContent(post.content);
    setIsEditing(true);
  };

  const save = () => {
    if (!title.trim() || !content.trim()) return;
    updatePost({ title: title.trim(), content: content.trim() });
    setIsEditing(false);
  };

  const cancel = () => setIsEditing(false);

  return {
    isEditing,
    isUpdating,
    title,
    content,
    onTitleChange: setTitle,
    onContentChange: setContent,
    canSave: !!title.trim() && !!content.trim(),
    start,
    save,
    cancel,
  };
}
