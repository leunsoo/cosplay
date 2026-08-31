'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateQna, QNA_QUERIES } from '@/shared/api/endpoints/qna';

export function useUpdateQna(qnaPostId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { title: string; content: string }) =>
      updateQna({ id: qnaPostId, ...body }),
    onSuccess: () => {
      // 상세 데이터는 이제 Server Component가 소유하므로(client 캐시 없음),
      // 캐시 무효화 대신 router.refresh()로 서버 컴포넌트를 새 데이터로 재실행한다.
      queryClient.invalidateQueries({ queryKey: QNA_QUERIES.lists() });
      router.refresh();
    },
  });
}
