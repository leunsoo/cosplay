import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/auth';
import { getSearchKeywords } from '../api/get-search-keywords';
import { deleteAllSearchKeywords } from '../api/delete-all-search-keywords';
import { deleteSearchKeyword } from '../api/delete-search-keyword';

export function useRecentKeywords() {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore((state) => state.userUuid);

  const { data: keywordsData } = useQuery({
    queryKey: ['search-keywords', userUuid],
    queryFn: () => getSearchKeywords({ uuid: userUuid }),
    enabled: !!userUuid,
    staleTime: Infinity,
  });

  const keywords = keywordsData?.data.keywords ?? [];

  const { mutate: deleteAll } = useMutation({
    mutationFn: () => deleteAllSearchKeywords({ uuid: userUuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['search-keywords', userUuid],
      });
    },
  });

  const { mutate: deleteSingle } = useMutation({
    mutationFn: (keywordId: number) =>
      deleteSearchKeyword({ keywordId, uuid: userUuid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['search-keywords', userUuid],
      });
    },
  });

  return { keywords, deleteAll, deleteSingle };
}
