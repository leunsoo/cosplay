'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { createQna, QNA_QUERIES } from '@/shared/api/endpoints/qna';

export function useCreateQna() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) => createQna(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QNA_QUERIES.lists() });
      router.push(ROUTES.COMMUNITY.LIST);
    },
  });
}
