'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { apiClient, type ApiResponse } from '@/shared/api';
import { IS_DEMO } from '@/shared/lib/isDemo';
import { createDemoQna } from '@/mocks';
import { QNA_QUERIES } from '@/shared/api/qna';

function createQna(body: {
  title: string;
  content: string;
}): Promise<ApiResponse<string>> {
  if (IS_DEMO) {
    const id = createDemoQna(body);
    return Promise.resolve({
      status: 'SUCCESS',
      message: '성공',
      data: String(id),
    });
  }
  return apiClient.post('/api/v1/qna-posts', body);
}

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
