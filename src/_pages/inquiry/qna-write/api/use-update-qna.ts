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
      // 상세 페이지 데이터는 Server Component가 소유하므로(client 캐시 없음),
      // router.refresh()로 상세 페이지가 새 데이터로 다시 렌더링되게 한 뒤 이동한다.
      queryClient.invalidateQueries({ queryKey: QNA_QUERIES.lists() });
      router.refresh();
      router.push(ROUTES.COMMUNITY.QNA_DETAIL(qnaPostId));
    },
  });
}
