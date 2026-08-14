'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { updateDemoQna } from '@/mocks';
import { QNA_QUERIES } from '@/shared/api/qna';

function updateQna(body: {
  id: number;
  title: string;
  content: string;
}): Promise<ApiResponse<string>> {
  if (IS_DEMO) {
    updateDemoQna(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(body.id),
    });
  }
  return apiClient.put('/api/v1/qna-posts', body);
}

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
