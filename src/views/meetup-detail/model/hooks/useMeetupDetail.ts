import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { ROUTES } from '@/core/config';
import { getMeetupDetail, deleteMeetup } from '../../api/meetupDetailApi';

export function useMeetupDetail(meetupId: number) {
  const router = useRouter();
  const currentUuid = useAuthStore((state) => state.userUuid);

  const {
    data: detailData,
    isLoading,
    error: detailError,
  } = useQuery({
    queryKey: ['meetup-detail', meetupId],
    queryFn: () => getMeetupDetail(meetupId),
  });

  const detail = detailData?.data ?? null;
  const isHost = !!detail && !!currentUuid && detail.host.uuid === currentUuid;

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteMeetup(meetupId),
    onSuccess: () => {
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
