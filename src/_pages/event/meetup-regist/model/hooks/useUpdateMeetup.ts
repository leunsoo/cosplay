import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/routes';
import { convertToWebp } from '@/shared/lib/imageFormat';
import { uploadToS3 } from '@/shared/lib/s3';
import { mapFormDataToCreateMeetupBody } from '../mapper';
import {
  MEETUP_QUERIES,
  getMeetupPresignedUrl,
  updateMeetup,
} from '@/shared/api/meetup';
import type { MeetupFormData } from '../types';
import { IS_DEMO } from '@/shared/lib/isDemo';

export function useUpdateMeetup(meetupId?: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (formData: MeetupFormData) => {
      if (!meetupId) throw new Error('meetupId가 없습니다.');

      let thumbnailUrl: string | undefined;

      if (formData.thumbnailFile) {
        if (IS_DEMO) {
          // 데모 모드: 실제 업로드 없이 로컬 미리보기 URL 사용
          thumbnailUrl = URL.createObjectURL(formData.thumbnailFile);
        } else {
          const res = await getMeetupPresignedUrl('thumbnail.webp');
          const { uploadUrl, imageUrl } = res.data;
          const webp = await convertToWebp(formData.thumbnailFile);
          await uploadToS3(uploadUrl, webp);
          thumbnailUrl = imageUrl;
        }
      }

      const body = mapFormDataToCreateMeetupBody(formData, thumbnailUrl);
      return updateMeetup(meetupId, {
        ...body,
        thumbnailUrl: thumbnailUrl ?? formData.thumbnailPreview,
        locationDetail: body.locationDetail ?? '',
      });
    },
    onSuccess: () => {
      if (!meetupId) return;
      queryClient.invalidateQueries({
        queryKey: MEETUP_QUERIES.detail(meetupId).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: MEETUP_QUERIES.all() });
      alert('모임이 수정되었습니다.');
      router.push(ROUTES.MEETUP.DETAIL(meetupId));
    },
    onError: (error) => {
      console.error('모임 수정 실패:', error);
      alert('모임 수정에 실패했습니다.');
    },
  });

  return { update, isPending };
}
