'use client';

import { useQuery } from '@tanstack/react-query';
import { getQnaPost } from '../../api/qnaApi';
import { mapQnaPostDetailDTO } from '../mapper';
import type { QnaPostDetail } from '../types';

export function useQnaPost(qnaPostId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['qna-post', qnaPostId],
    queryFn: () => getQnaPost(qnaPostId),
    enabled: !!qnaPostId,
  });

  const post: QnaPostDetail | null = data?.data
    ? mapQnaPostDetailDTO(data.data)
    : null;

  return { post, isLoading, error };
}
