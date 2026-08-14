'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { deleteDemoQna } from '@/mocks';
import { QNA_QUERIES } from '@/shared/api/qna';

function deleteQna(qnaPostId: number): Promise<ApiResponse<string>> {
  if (IS_DEMO) {
    deleteDemoQna(qnaPostId);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(qnaPostId),
    });
  }
  return apiClient.delete(`/api/v1/qna-posts/${qnaPostId}`);
}

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
