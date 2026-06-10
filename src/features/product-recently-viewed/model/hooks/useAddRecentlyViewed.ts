import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRecentlyViewed } from '../../api';
import { useLogined } from '@/entities/auth';

interface UseAddRecentlyViewedParams {
  uuid: string;
  productId: number;
}

export function useAddRecentlyViewed({
  uuid,
  productId,
}: UseAddRecentlyViewedParams) {
  const logined = useLogined();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addRecentlyViewed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recently-viewed', uuid],
      });
    },
  });

  useEffect(() => {
    if (!logined) return;
    mutation.mutate({ uuid, productId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
