'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { updateQna, QNA_QUERIES } from '@/shared/api/endpoints/qna';

export function useUpdateQna(qnaPostId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) =>
      updateQna({ id: qnaPostId, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QNA_QUERIES.detail(qnaPostId).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: QNA_QUERIES.lists() });
      router.push(ROUTES.COMMUNITY.QNA_DETAIL(qnaPostId));
    },
  });
}
