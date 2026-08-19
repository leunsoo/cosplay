import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/auth';
import { ROUTES } from '@/shared/routes';
import { deleteMeetup, MEETUP_QUERIES } from '@/shared/api/endpoints/meetup';

export function useMeetupDetail(meetupId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUuid = useAuthStore((state) => state.userUuid);

  const {
    data: detailData,
    isLoading,
    error: detailError,
  } = useQuery(MEETUP_QUERIES.detail(meetupId));

  const detail = detailData?.data ?? null;
  const isHost = !!detail && !!currentUuid && detail.host.uuid === currentUuid;

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteMeetup(meetupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETUP_QUERIES.all() });
      router.push(ROUTES.HOME);
    },
  });

  return {
    detail,
    isHost,
    isLoading,
    error: detailError ? '개인 행사 정보를 불러오는데 실패했습니다.' : null,
    handleDelete,
    isDeleting,
  };
}
