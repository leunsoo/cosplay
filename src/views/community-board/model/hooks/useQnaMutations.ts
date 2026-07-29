'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { createQnaPost, updateQnaPost, deleteQnaPost } from '../../api/qnaApi';

export function useCreateQnaPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) =>
      createQnaPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qna-posts'] });
      router.push(ROUTES.COMMUNITY.LIST);
    },
  });
}

export function useUpdateQnaPost(qnaPostId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) =>
      updateQnaPost({ id: qnaPostId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qna-post', qnaPostId] });
      queryClient.invalidateQueries({ queryKey: ['qna-posts'] });
      router.push(ROUTES.COMMUNITY.QNA_DETAIL(qnaPostId));
    },
  });
}

export function useDeleteQnaPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qnaPostId: number) => deleteQnaPost(qnaPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qna-posts'] });
      router.push(ROUTES.COMMUNITY.LIST);
    },
  });
}
