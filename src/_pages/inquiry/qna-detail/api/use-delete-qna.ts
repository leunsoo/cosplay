'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { deleteQna, QNA_QUERIES } from '@/shared/api/qna';

export function useDeleteQna() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (qnaPostId: number) => deleteQna(qnaPostId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QNA_QUERIES.lists() });
      router.push(ROUTES.COMMUNITY.LIST);
    },
  });
}
